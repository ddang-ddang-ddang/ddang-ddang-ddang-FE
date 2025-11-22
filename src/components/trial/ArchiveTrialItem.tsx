import React from "react";

interface ArchiveTrialItemProps {
  index: number;
  caseId: number;
  title: string;
  argumentAMain: string;
  argumentBMain: string;
  onClick: () => void;
}

const ArchiveTrialItem: React.FC<ArchiveTrialItemProps> = ({
  index,
  title,
  argumentAMain,
  argumentBMain,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="grid grid-cols-12 gap-0 px-6 py-5 hover:bg-main-bright/30 transition-colors cursor-pointer items-center"
    >
      {/* 순서 */}
      <div className="col-span-1 text-center text-main font-semibold">
        {index}
      </div>

      {/* 주제 */}
      <div className="col-span-4 text-main font-medium pl-4">
        {title}
      </div>

      {/* A 주장 */}
      <div className="col-span-3 text-gray-700 text-sm truncate pr-4">
        {argumentAMain}
      </div>

      {/* B 주장 */}
      <div className="col-span-4 text-gray-700 text-sm truncate">
        {argumentBMain}
      </div>
    </div>
  );
};

export default ArchiveTrialItem;
