import React from "react";

interface OngoingTrialItemProps {
  index: number;
  caseId: number;
  title: string;
  argumentAMain: string;
  argumentBMain: string;
  status: string;
  onClick: () => void;
}

const OngoingTrialItem: React.FC<OngoingTrialItemProps> = ({
  index,
  title,
  argumentAMain,
  argumentBMain,
  status,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-main-bright/30 transition-colors cursor-pointer items-center"
    >
      {/* 순서 */}
      <div className="col-span-1 text-center text-main font-semibold border-r border-gray-300 flex items-center justify-center">
        {index}
      </div>

      {/* 주제 */}
      <div className="col-span-4 text-main font-medium border-r border-gray-300 flex items-center">
        {title}
      </div>

      {/* A 주장 */}
      <div className="col-span-3 text-gray-700 text-sm truncate border-r border-gray-300 flex items-center">
        {argumentAMain}
      </div>

      {/* B 주장 */}
      <div className="col-span-3 text-gray-700 text-sm truncate border-r border-gray-300 flex items-center">
        {argumentBMain}
      </div>

      {/* 상태 */}
      <div className="col-span-1 text-center flex items-center justify-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
          {status}
        </span>
      </div>
    </div>
  );
};

export default OngoingTrialItem;
