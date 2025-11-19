import React from "react";

interface WaitingTrialItemProps {
  index: number;
  caseId: number;
  title: string;
  argumentAMain: string;
  createdAt: string;
  onClick: () => void;
}

const getTimeAgo = (createdAt: string): string => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now.getTime() - created.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  return `${diffDays}일 전`;
};

const WaitingTrialItem: React.FC<WaitingTrialItemProps> = ({
  index,
  title,
  argumentAMain,
  createdAt,
  onClick,
}) => {
  return (
    <div
      className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-[#F8FBFF] cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="col-span-1 text-center flex items-center justify-center">
        <span className="text-main-medium font-bold text-lg">{index}</span>
      </div>

      <div className="col-span-3 flex items-center">
        <span className="font-bold text-main">{argumentAMain}</span>
      </div>

      <div className="col-span-6 flex items-center">
        <span className="text-main-medium line-clamp-2">{title}</span>
      </div>

      <div className="col-span-2 text-center flex items-center justify-center">
        <span className="text-main-medium text-sm">
          {getTimeAgo(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default WaitingTrialItem;
