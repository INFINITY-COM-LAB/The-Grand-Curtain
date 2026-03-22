// Hook for PWA install prompt

import { useState, useEffect } from "react";
import { installPromptManager } from "@/utils/installPrompt";

export function useInstallPrompt() {
  const [canInstall, setCanInstall] = useState(
    installPromptManager.canInstall()
  );
  const [isInstalledAsApp, setIsInstalledAsApp] = useState(
    installPromptManager.isInstalledAsApp()
  );

  useEffect(() => {
    const unsubscribe = installPromptManager.subscribe((canInstall) => {
      setCanInstall(canInstall);
    });

    return unsubscribe;
  }, []);

  const handleInstall = async () => {
    const success = await installPromptManager.promptInstall();
    if (success) {
      setIsInstalledAsApp(true);
      setCanInstall(false);
    }
  };

  return {
    canInstall,
    isInstalledAsApp,
    handleInstall,
  };
}
