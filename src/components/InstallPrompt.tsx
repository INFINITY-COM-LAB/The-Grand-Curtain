// PWA Install Prompt Component

import { Download, X } from "lucide-react";
import { useState } from "react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

export function InstallPrompt() {
  const { canInstall, handleInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);

  if (!canInstall || dismissed) {
    return null;
  }

  return (
    <div className="fixed top-16 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-40 bg-amber-600 text-white rounded-lg shadow-xl p-4 border border-amber-700 animate-in slide-in-from-top">
      <div className="flex items-start gap-3">
        <Download className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">Install The Grand Curtain</p>
          <p className="text-xs text-amber-100 mt-1">
            Get quick access to shows and your favorites
          </p>
          <button
            onClick={handleInstall}
            className="mt-3 w-full bg-white text-amber-600 font-medium py-2 rounded-md hover:bg-amber-50 transition-colors text-sm"
          >
            Install App
          </button>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-100 hover:text-white shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
