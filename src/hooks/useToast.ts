import { useToastStore } from "@/stores/useToastStore";
import { useCallback } from "react";

export const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);

  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      addToast(message, "success", duration);
    },
    [addToast]
  );

  const showError = useCallback(
    (message: string, duration?: number) => {
      addToast(message, "error", duration);
    },
    [addToast]
  );

  const showWarning = useCallback(
    (message: string, duration?: number) => {
      addToast(message, "warning", duration);
    },
    [addToast]
  );

  const showInfo = useCallback(
    (message: string, duration?: number) => {
      addToast(message, "info", duration);
    },
    [addToast]
  );

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
