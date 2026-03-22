// Hook for monitoring offline status in components

import { useState, useEffect } from "react";
import { offlineDetection, type OfflineState } from "@/utils/offlineDetection";

export function useOfflineStatus() {
  const [offlineState, setOfflineState] = useState<OfflineState>(
    offlineDetection.getState()
  );

  useEffect(() => {
    // Subscribe to offline state changes
    const unsubscribe = offlineDetection.subscribe((state) => {
      setOfflineState(state);
    });

    return unsubscribe;
  }, []);

  return {
    isOnline: offlineState.isOnline,
    lastOnlineTime: offlineState.lastOnlineTime,
    reconnectAttempts: offlineState.reconnectAttempts,
  };
}
