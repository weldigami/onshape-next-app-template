// components/ui/use-toast.tsx
import { useState } from "react";

interface Toast {
  id: number;
  title: string;
  description: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    setToasts((prev) => [...prev, { id: Date.now(), ...toast }]);
  };

  return {
    toasts,
    toast: addToast,
  };
}
