// src/components/mypage/tabs/ExpTab.tsx
import React from "react";
import { getRankNicknameFrame } from "@/utils/rankImageMapper";

interface ExpTabProps {
  currentRank: string;
  currentExp: number;
  nickname?: string;
}

// 백엔드 ENUM과 동일한 칭호 데이터
const rankData = [
  { name: '파트너 변호사', minExp: 8500 },
  { name: '시니어 변호사', minExp: 6500 },
  { name: '중견 변호사', minExp: 5000 },
  { name: '신입 변호사', minExp: 4100 },
  { name: '로스쿨 졸업반', minExp: 3650 },
  { name: '로스쿨 2학년', minExp: 3000 },
  { name: '로스쿨 1학년', minExp: 2400 },
  { name: '법대생 졸업반', minExp: 1900 },
  { name: '법대생 3학년', minExp: 1400 },
  { name: '법대생 2학년', minExp: 1000 },
  { name: '법대생 1학년', minExp: 700 },
  { name: '말싸움 고수', minExp: 500 },
  { name: '말싸움 중수', minExp: 250 },
  { name: '말싸움 하수', minExp: 100 },
  { name: '말싸움 풋내기', minExp: 0 },
];

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

  // 현재 칭호의 경험치 범위 계산
  const currentRankIndex = rankData.findIndex(r => r.name === currentRank);
  const currentRankData = rankData[currentRankIndex];
  const nextRankData = currentRankIndex > 0 ? rankData[currentRankIndex - 1] : null;
  
  // 현재 칭호 구간의 시작값과 끝값
  const rangeStart = currentRankData?.minExp || 0;
  const rangeEnd = nextRankData?.minExp || rangeStart + 2000; // 다음 칭호가 없으면 +2000
  const rangeTotal = rangeEnd - rangeStart;
  
  // 현재 구간에서의 진행도
  const progressInRange = currentExp - rangeStart;
  const progressPercentage = Math.min((progressInRange / rangeTotal) * 100, 100);

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
      
      {/* 경험치 바 */}
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 relative">
          <div 
            className="bg-main h-3 md:h-4 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }} 
          />
        </div>
        {/* 시작값과 끝값 표시 */}
        <div className="flex justify-between text-xs md:text-sm text-gray-600 mt-1">
          <span>{rangeStart}</span>
          <span>{rangeEnd}</span>
        </div>
      </div>

      {nextRankData && (
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
          다음 칭호 <span className="font-bold text-main">{nextRankData.name}</span>까지{' '}
          <span className="font-bold text-main">{rangeEnd - currentExp}</span> 경험치 필요
        </p>
      )}

      {/* 칭호 단계 */}
      <div className="mb-6">
        <h4 className="text-lg md:text-xl font-bold text-main mb-4">칭호 단계</h4>
        <div className="space-y-6">
          {rankCategories.map((categoryData) => (
            <div key={categoryData.category}>
              <p className="text-sm md:text-base font-semibold text-main mb-3">{categoryData.category}</p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {categoryData.ranks.map((rankName) => {
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