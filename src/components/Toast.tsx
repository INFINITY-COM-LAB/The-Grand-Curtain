/**
 * Toast Component
 * Displays notifications at the bottom-right of the screen
 * Auto-dismisses based on duration or manual close
 */

import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import type { Toast as ToastType, ToastType as NotificationType } from "../hooks/useToast";

const typeConfig: Record<NotificationType, { bg: string; border: string; icon: React.ReactNode }> = {
  success: {
    bg: "bg-green-50/10 border-green-500/30",
    border: "border-green-500/30",
    icon: <CheckCircle className="h-5 w-5 text-green-400" />,
  },
  error: {
    bg: "bg-red-50/10 border-red-500/30",
    border: "border-red-500/30",
    icon: <AlertCircle className="h-5 w-5 text-red-400" />,
  },
  warning: {
    bg: "bg-yellow-50/10 border-yellow-500/30",
    border: "border-yellow-500/30",
    icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
  },
  info: {
    bg: "bg-blue-50/10 border-blue-500/30",
    border: "border-blue-500/30",
    icon: <Info className="h-5 w-5 text-blue-400" />,
  },
};

export function Toast({ toast, onDismiss }: { toast: ToastType; onDismiss: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const config = typeConfig[toast.type];

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onDismiss, 300); // Wait for exit animation
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration, onDismiss]);

  return (
    <div
      className={`
        transform transition-all duration-300 ease-out
        ${
          isExiting
            ? "translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        }
      `}
    >
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg
          border ${config.bg}
          backdrop-blur-md
          min-w-[300px] max-w-[500px]
          shadow-lg
        `}
      >
        <div className="flex-shrink-0">{config.icon}</div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white break-words">{toast.message}</p>
        </div>

        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-white/40 hover:text-white transition-colors ml-2"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function ToastContainer({ toasts, onDismiss }: { toasts: ToastType[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onDismiss={() => onDismiss(toast.id)} />
        </div>
      ))}
    </div>
  );
}
