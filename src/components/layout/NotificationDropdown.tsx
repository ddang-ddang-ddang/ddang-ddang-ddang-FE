import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "@/stores/useNotificationStore";
import type { NotificationData } from "@/types/apis/notification";

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, clearNotifications, setHighlightRebuttal } = useNotificationStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const handleNotificationClick = (e: React.MouseEvent, notification: NotificationData) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (notification.rebuttalId) {
      setHighlightRebuttal(notification.rebuttalId);
      if (notification.caseId) {
        navigate(`/secondtrial/1/${notification.caseId}?rebuttalId=${notification.rebuttalId}`);
      }
    } else if (notification.defenseId && notification.caseId) {
      navigate(`/secondtrial/1/${notification.caseId}?defenseId=${notification.defenseId}`);
    } else if (notification.caseId) {
      navigate(`/secondtrial/1/${notification.caseId}`);
    } else if (notification.judgmentId) {
      navigate(`/secondtrial/final/${notification.judgmentId}`);
    }
    
    onClose();
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "PARTY_JOINED":
        return "🎉";
      case "DEFENSE_REPLIED":
        return "💬";
      case "REBUTTAL_REPLIED":
        return "↪️";
      case "JUDGMENT_COMPLETE":
        return "⚖️";
      case "JUDGMENT_ERROR":
        return "⚠️";
      default:
        return "🔔";
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-[9999] max-h-[500px] overflow-hidden flex flex-col p-4"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg text-main">알림</h3>
        {notifications.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearNotifications();
            }}
            className="text-xs text-main hover:text-main-medium font-semibold"
          >
            모두 삭제
          </button>
        )}
      </div>

      {/* 알림 목록 */}
      <div className="overflow-y-auto flex-1 -mx-2">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-2">🔔</div>
            <p>알림이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-2 px-2">
            {notifications.map((notification: NotificationData) => (
              <button
                key={notification.timestamp}
                onClick={(e) => handleNotificationClick(e, notification)}
                className="w-full p-3 text-left hover:bg-main-bright transition-colors cursor-pointer rounded-lg"
                type="button"
              >
                <div className="flex items-start gap-3">
                  {/* 아이콘 */}
                  <div className="w-10 h-10 rounded-full bg-main-bright flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {notification.authorNickname && (
                      <p className="text-xs font-semibold text-gray-700 mb-1">
                        {notification.authorNickname}
                      </p>
                    )}
                    <p className="text-sm text-gray-900 font-medium line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;