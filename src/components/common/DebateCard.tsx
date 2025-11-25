import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH_BUILDERS } from "@/constants";
import LawIcon from "@/assets/svgs/law.svg?react";

type Debate = {
  id: number;
  title: string;
  originalTitle?: string;
  participateCnt: number; 
  mainArguments?: string[]; 
};

type HotDebateCardProps = {
  debate: Debate;
  isFirst?: boolean;
};

const HotDebateCard = ({ debate, isFirst = false }: HotDebateCardProps) => {
  const navigate = useNavigate();
  const titleParts = debate.title.split("VS");

  const handleCardClick = () => {
    navigate(PATH_BUILDERS.secondTrialRoundOne(debate.id));
  };

  // mainArguments가 있으면 사용, 없으면 기본 텍스트
  const description = debate.mainArguments && debate.mainArguments.length > 0
    ? debate.mainArguments[0] // A측 주장을 설명으로 표시
    : "재판에 참여해서 변론을 작성하고, 당신의 논리를 펼쳐보세요!";

  return (
    <div
      onClick={handleCardClick}
      className={`
        rounded-[29px]
        pt-[4px] pb-[24px] px-[6px]
        w-full
        cursor-pointer
        flex items-center justify-center
        ${isFirst
          ? 'bg-main-medium'
          : 'bg-[#C0DCFF]'
        }
      `}
    >
      <div
        className={`
          bg-white
          rounded-[24px]
          w-full
          h-[206px]
          p-[24px]
          relative
          flex flex-col
          ${isFirst ? 'shadow-lg' : ''}
        `}
      >
        {/* 1등 배지 */}
        {isFirst && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 z-10">
            <span className="text-lg">🔥</span>
            <span>HOT #1</span>
          </div>
        )}

        {/* 제목 영역 */}
        <div className="flex flex-col space-y-0.5">
          {titleParts.map((part, index) => (
            <React.Fragment key={index}>
              <p
                className="text-left text-main font-bold text-lg leading-snug truncate"
                title={part.trim()}
              >
                {part.trim()}
              </p>

              {index === 0 && (
                <p className="text-left font-bold text-sm text-main my-1">VS</p>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 설명 */}
        <p className="text-left text-sm text-main mt-4 line-clamp-2">
          {debate.originalTitle}
        </p>

        {/* 참여자 수 */}
        <div className="flex gap-2 absolute bottom-[24px] right-[24px]">
          <LawIcon />
          <p className="text-right text-xs text-main-medium font-semibold">
            참여 중인 변호사 {debate.participateCnt}명
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotDebateCard;
