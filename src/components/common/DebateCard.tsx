// src/components/HotDebateCard.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트

type Debate = {
  id: number;
  title: string;
};

type HotDebateCardProps = {
  debate: Debate;
};

const HotDebateCard = ({ debate }: HotDebateCardProps) => {
  const navigate = useNavigate(); // useNavigate 훅 초기화

  // 클릭 이벤트 핸들러
  const handleCardClick = () => {
    // 특정 로직 수행 (예: 로그 기록, 분석 데이터 전송 등)
    console.log(`${debate.title} 카드 클릭됨`);

    // debate.id를 사용하여 동적 URL로 페이지 이동
    navigate(`/debate/${debate.id}`);
  };

  return (
    <div
      onClick={handleCardClick} // onClick 이벤트 핸들러 연결
      className="inline-flex items-center flex-shrink-0 bg-white rounded-[30px] cursor-pointer"
      style={{
        width: '285px',
        height: '215px',
        padding: '38px 38px 141px 27px',
      }}
    >
      <p className="text-center font-semibold">{debate.title}</p>
    </div>
  );
};

export default HotDebateCard;