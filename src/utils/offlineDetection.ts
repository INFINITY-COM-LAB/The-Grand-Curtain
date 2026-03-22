// Offline Detection & Status Management

export interface OfflineState {
  isOnline: boolean;
  lastOnlineTime: number;
  reconnectAttempts: number;
}

class OfflineDetection {
  private state: OfflineState = {
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    lastOnlineTime: Date.now(),
    reconnectAttempts: 0,
  };

  private listeners: Set<(state: OfflineState) => void> = new Set();
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private reconnectInterval: number = 3000; // Start at 3s
  private maxReconnectInterval: number = 30000; // Cap at 30s

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window !== "undefined") {
      window.addEventListener("online", () => this.handleOnline());
      window.addEventListener("offline", () => this.handleOffline());
    }
  }

  private handleOnline() {
    this.state.isOnline = true;
    this.state.lastOnlineTime = Date.now();
    this.state.reconnectAttempts = 0;
    this.reconnectInterval = 3000; // Reset backoff
    this.clearReconnectTimeout();
    this.notifyListeners();
  }

  private handleOffline() {
    this.state.isOnline = false;
    this.notifyListeners();
    this.scheduleReconnectCheck();
  }

  private scheduleReconnectCheck() {
    this.clearReconnectTimeout();
    this.reconnectTimeout = setTimeout(() => {
      this.state.reconnectAttempts++;
      this.checkConnection();
    }, this.reconnectInterval);

    // Exponential backoff with jitter
    this.reconnectInterval = Math.min(
      this.reconnectInterval * 1.5 + Math.random() * 1000,
      this.maxReconnectInterval
    );
  }

  private async checkConnection() {
    try {
      // Try to fetch a lightweight resource
      const response = await fetch("/", { method: "HEAD" });
      if (response.ok) {
        this.handleOnline();
      } else {
        this.scheduleReconnectCheck();
      }
    } catch {
      // Still offline
      this.scheduleReconnectCheck();
    }
  }

  private clearReconnectTimeout() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  // Public API
  getState(): OfflineState {
    return { ...this.state };
  }

  isOnline(): boolean {
    return this.state.isOnline;
  }

  subscribe(listener: (state: OfflineState) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  destroy() {
    this.clearReconnectTimeout();
    this.listeners.clear();
  }
}

// Singleton instance
export const offlineDetection = new OfflineDetection();
