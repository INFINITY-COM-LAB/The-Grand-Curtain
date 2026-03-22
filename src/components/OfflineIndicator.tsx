// Offline Status Indicator Component

import { WifiOff, Wifi } from "lucide-react";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";

export function OfflineIndicator() {
  const { isOnline, reconnectAttempts } = useOfflineStatus();

  if (isOnline) {
    return null; // Don't show when online
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className="bg-red-600 text-white rounded-lg shadow-xl p-4 border border-red-700 animate-pulse">
        <div className="flex items-center gap-3">
          <WifiOff className="w-5 h-5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">You are offline</p>
            <p className="text-xs text-red-100 mt-1">
              {reconnectAttempts > 0 
                ? `Reconnecting... (attempt ${reconnectAttempts})`
                : "Checking connection..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Online status indicator (optional, for desktop)
export function OnlineStatusBadge() {
  const { isOnline } = useOfflineStatus();

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-900/30 border border-green-700">
      <Wifi className="w-4 h-4 text-green-500" />
      <span className="text-xs font-medium text-green-300">
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
}
