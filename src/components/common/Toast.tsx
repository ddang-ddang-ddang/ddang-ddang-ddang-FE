import React from "react";
import { useToastStore } from "@/stores/useToastStore";
import type { Toast as ToastType } from "@/types/toast";

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: ToastType;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const getToastStyle = (type: ToastType["type"]) => {
    switch (type) {
      case "success":
        return { bgColor: "bg-green-500", icon: "✓" };
      case "error":
        return { bgColor: "bg-red-500", icon: "✕" };
      case "warning":
        return { bgColor: "bg-yellow-500", icon: "⚠" };
      case "info":
      default:
        return { bgColor: "bg-blue-600", icon: "ℹ" };
    }
  };

  const { bgColor, icon } = getToastStyle(toast.type);

  return (
    <div
      className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300 ease-out animate-slide-up pointer-events-auto`}
    >
      {/* 아이콘 */}
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
        <span className="text-2xl font-bold">
          {icon}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold break-words">{toast.message}</p>
      </div>

      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 font-bold text-xl flex-shrink-0 transition-colors"
        aria-label="닫기"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
