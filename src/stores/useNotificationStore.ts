// dev/src/stores/useNotificationStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NotificationData } from "@/types/apis/notification";

type NotificationState = {
  notifications: NotificationData[];
  unreadCount: number;
  currentToast: NotificationData | null;
  highlightRebuttalId: number | null;
  
  addNotification: (notification: NotificationData) => void;
  showToast: (notification: NotificationData) => void;
  hideToast: () => void;
  setHighlightRebuttal: (id: number | null) => void;
  markAsRead: (timestamp: number) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
};

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      unreadCount: 0,
      currentToast: null,
      highlightRebuttalId: null,

      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        })),

      showToast: (notification) =>
        set({ currentToast: notification }),

      hideToast: () =>
        set({ currentToast: null }),

      setHighlightRebuttal: (id) =>
        set({ highlightRebuttalId: id }),

      markAsRead: (timestamp) =>
        set((state) => ({
          unreadCount: Math.max(0, state.unreadCount - 1),
        })),

      markAllAsRead: () =>
        set({ unreadCount: 0 }),

      clearNotifications: () =>
        set({ notifications: [], unreadCount: 0 }),
    }),
    {
      name: "notification-storage",
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
      }),
    }
  )
);