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
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
      default:
        return "bg-blue-600";
    }
  };

  const getIcon = (type: ToastType["type"]) => {
    switch (type) {
      case "success":
        return <span className="text-2xl font-bold">✓</span>;
      case "error":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.47012 20.9999H19.5301C21.0701 20.9999 22.0301 19.3299 21.2601 17.9999L13.7301 4.98993C12.9601 3.65993 11.0401 3.65993 10.2701 4.98993L2.74012 17.9999C1.97012 19.3299 2.93012 20.9999 4.47012 20.9999ZM12.0001 13.9999C11.4501 13.9999 11.0001 13.5499 11.0001 12.9999V10.9999C11.0001 10.4499 11.4501 9.99993 12.0001 9.99993C12.5501 9.99993 13.0001 10.4499 13.0001 10.9999V12.9999C13.0001 13.5499 12.5501 13.9999 12.0001 13.9999ZM13.0001 17.9999H11.0001V15.9999H13.0001V17.9999Z" fill="white"/>
          </svg>
        );
      case "warning":
        return <span className="text-2xl font-bold">⚠</span>;
      case "info":
        return <span className="text-2xl font-bold">ℹ</span>;
      default:
        return <span className="text-2xl font-bold">ℹ</span>;
    }
  };

  const bgColor = getToastStyle(toast.type);

  return (
    <div
      className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300 ease-out animate-slide-up pointer-events-auto`}
    >
      {/* 아이콘 */}
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
        {getIcon(toast.type)}
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
