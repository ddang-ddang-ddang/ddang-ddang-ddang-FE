// src/components/mypage/tabs/ExpTab.tsx
import React from "react";
import { getRankNicknameFrame } from "@/utils/rankImageMapper";

interface ExpTabProps {
  currentRank: string;
  currentExp: number;
  nickname?: string;
}

// 칭호 단계 데이터
const rankCategories = [
  {
    category: '말싸움',
    ranks: [
      '말싸움 풋내기',
      '말싸움 하수',
      '말싸움 중수',
      '말싸움 고수',
    ]
  },
  {
    category: '법대생',
    ranks: [
      '법대생 1학년',
      '법대생 2학년',
      '법대생 3학년',
      '법대생 졸업반',
    ]
  },
  {
    category: '로스쿨',
    ranks: [
      '로스쿨 1학년',
      '로스쿨 2학년',
      '로스쿨 졸업반',
    ]
  },
  {
    category: '변호사',
    ranks: [
      '신입 변호사',
      '중견 변호사',
      '시니어 변호사',
      '파트너 변호사',
    ]
  },
];

export const ExpTab: React.FC<ExpTabProps> = ({ currentRank, currentExp, nickname }) => {
  const nicknameFrameImage = getRankNicknameFrame(currentRank);

  return (
    <div className="pt-4">
      <h3 className="text-xl md:text-2xl font-bold text-main mb-4 md:mb-6">현재 칭호</h3>
      
      {/* 명패 이미지 위에 텍스트 오버레이 */}
      <div className="relative w-32 md:w-40 mb-6 md:mb-8">
        <img 
          src={nicknameFrameImage} 
          alt="칭호 명패" 
          className="w-full h-auto"
        />
        {/* 텍스트 오버레이 - 칭호 닉네임 순서로 한 줄에 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-main font-bold text-[10px] md:text-xs">
            {currentRank} {nickname || "닉네임"}
          </p>
        </div>
      </div>

      <p className="text-lg md:text-xl font-bold text-main mb-3 md:mb-4">
        현재 경험치: <span className="text-main">{currentExp}</span>
      </p>
      <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 mb-6 md:mb-8">
        <div 
          className="bg-main h-3 md:h-4 rounded-full transition-all duration-500" 
          style={{ width: `${Math.min((currentExp / 2000) * 100, 100)}%` }} 
        />
      </div>

      {/* 칭호 단계 */}
      <div className="mb-6">
        <h4 className="text-lg md:text-xl font-bold text-main mb-4">칭호 단계</h4>
        <div className="space-y-6">
          {rankCategories.map((categoryData) => (
            <div key={categoryData.category}>
              <p className="text-sm md:text-base font-semibold text-main mb-3">{categoryData.category}</p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {categoryData.ranks.map((rankName, index) => {
                  const isActive = rankName === currentRank;
                  const frameImage = getRankNicknameFrame(rankName);
                  
                  return (
                    <div 
                      key={rankName} 
                      className="flex-shrink-0 p-2"
                    >
                      <div 
                        className={`relative w-20 md:w-24 transition-all ${
                          isActive ? 'scale-110 opacity-100' : 'opacity-50'
                        }`}
                      >
                        <img 
                          src={frameImage} 
                          alt={rankName}
                          className="w-full h-auto"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-main font-bold text-[8px] md:text-[10px] text-center px-1">
                            {rankName}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};