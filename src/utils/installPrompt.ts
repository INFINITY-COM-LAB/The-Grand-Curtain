// PWA Install Prompt Management

export interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

class InstallPromptManager {
  private deferredPrompt: InstallPromptEvent | null = null;
  private isInstalled: boolean = false;
  private listeners: Set<(canInstall: boolean) => void> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window !== "undefined") {
      // Listen for beforeinstallprompt event
      window.addEventListener("beforeinstallprompt", (e: Event) => {
        e.preventDefault();
        this.deferredPrompt = e as InstallPromptEvent;
        this.notifyListeners(true);
      });

      // Listen for app installed
      window.addEventListener("appinstalled", () => {
        this.isInstalled = true;
        this.deferredPrompt = null;
        this.notifyListeners(false);
      });

      // Check if running in standalone mode (already installed)
      if (
        (window.navigator as any).standalone === true ||
        window.matchMedia("(display-mode: standalone)").matches
      ) {
        this.isInstalled = true;
      }
    }
  }

  private notifyListeners(canInstall: boolean) {
    this.listeners.forEach((listener) => listener(canInstall));
  }

  canInstall(): boolean {
    return !!this.deferredPrompt && !this.isInstalled;
  }

  isInstalledAsApp(): boolean {
    return this.isInstalled;
  }

  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) return false;

    try {
      await this.deferredPrompt.prompt();
      const choice = await this.deferredPrompt.userChoice;
      
      if (choice.outcome === "accepted") {
        this.isInstalled = true;
        this.deferredPrompt = null;
        this.notifyListeners(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Install prompt failed:", error);
      return false;
    }
  }

  subscribe(listener: (canInstall: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const installPromptManager = new InstallPromptManager();
