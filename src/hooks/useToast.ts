/**
 * useToast Hook
 * Centralized toast/notification management for consistent UX across the app
 * Usage: const { show } = useToast(); show({ message: "Success!", type: "success" })
 */

import { useCallback, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number; // milliseconds, 0 = persistent
}

export interface ToastContextType {
  toasts: Toast[];
  show: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const defaultContext: ToastContextType = {
  toasts: [],
  show: () => {},
  dismiss: () => {},
  dismissAll: () => {},
};

// Global toast state (in a real app, use Context API or Zustand)
let globalToasts: Toast[] = [];
let listeners: ((toasts: Toast[]) => void)[] = [];

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((listeners: ((toasts: Toast[]) => void)[]) => {
    listeners.forEach((listener) => listener(globalToasts));
    setToasts([...globalToasts]);
  }, []);

  const show = useCallback(
    (toastData: Omit<Toast, "id">) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const toast: Toast = { ...toastData, id, duration: toastData.duration ?? 3000 };

      globalToasts = [...globalToasts, toast];
      notify(listeners);

      // Auto-dismiss if duration is set
      if (toast.duration && toast.duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, toast.duration);
      }
    },
    [notify]
  );

  const dismiss = useCallback((id: string) => {
    globalToasts = globalToasts.filter((t) => t.id !== id);
    notify(listeners);
  }, [notify]);

  const dismissAll = useCallback(() => {
    globalToasts = [];
    notify(listeners);
  }, [notify]);

  // Subscribe to global toast changes
  useState(() => {
    const listener = setToasts;
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  });

  return {
    toasts,
    show,
    dismiss,
    dismissAll,
  };
}
