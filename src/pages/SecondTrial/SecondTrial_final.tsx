import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from '@/constants';
import clsx from 'clsx';
import Button from '@/components/common/Button';
import { useSecondTrialDetailsQuery, useVoteResultQuery } from "@/hooks/secondTrial/useSecondTrial";

const SecondTrial_final: React.FC = () => {
  const { caseId: caseIdParam } = useParams<{ caseId?: string }>();
  const caseId = caseIdParam ? Number(caseIdParam) : undefined;
  const navigate = useNavigate();

  // API 훅
  const { data: detailsRes, isLoading: isDetailsLoading } = useSecondTrialDetailsQuery(caseId);
  const details = detailsRes?.result;

  const { data: voteResultRes, isLoading: isVoteResultLoading } = useVoteResultQuery(caseId);
  const voteResult = voteResultRes?.result;

  // 로딩
  if (isDetailsLoading || isVoteResultLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-main font-bold">로딩 중...</p>
      </div>
    );
  }

  // 데이터 없음 처리
  if (!details || !voteResult) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <p className="text-main-red font-bold text-xl">데이터를 받아오지 못했습니다</p>
        <div className="flex gap-3">
          <Button variant="primary" onClick={() => window.location.reload()}>다시 시도</Button>
          <Button variant="ghost" onClick={() => navigate(-1)}>이전으로</Button>
        </div>
      </div>
    );
  }

  // 투표 결과 (API 값만 사용)
  const ratioA = Math.max(0, Math.min(100, Math.round(voteResult.ratioA ?? 0)));
  const ratioB = Math.max(0, Math.min(100, Math.round(voteResult.ratioB ?? (100 - ratioA))));
  const totalVotes = voteResult.totalVotes ?? 0;

  const aContent = details.defenses?.find(d => d.side === 'A')?.content ?? '등록된 변론이 없습니다.';
  const bContent = details.defenses?.find(d => d.side === 'B')?.content ?? '등록된 변론이 없습니다.';

  return (
    <div className="bg-white min-h-screen pt-12 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* 헤더 */}
        <div className="flex justify-between items-center pb-4 mb-6">
          <h1 className="text-3xl font-bold text-main">2차 재판</h1>
          <span className="bg-[#FFE5E5] p-4 rounded-lg text-md font-medium text-main-red">
            재판종료
          </span>
        </div>

        {/* 사건 제목 */}
        <p className="font-medium mb-8 text-main">
          {details.caseTitle}
        </p>

        {/* A/B 카드 */}
        <div className="flex space-x-8 justify-center mb-12">
          <div
            className={clsx(
              "w-[513px] h-[447px] bg-main-medium rounded-[30px] flex justify-center items-center flex-col",
              "cursor-default opacity-70 border-gray-300"
            )}
          >
            <span className="text-2xl font-bold text-center text-white">A. 찬성</span>
            <p className="px-20 py-10 text-white text-center">{aContent}</p>
          </div>

          <div
            className={clsx(
              "w-[513px] h-[447px] bg-main-red rounded-[30px] flex justify-center items-center flex-col",
              "cursor-default opacity-70 border-gray-300"
            )}
          >
            <span className="text-2xl font-bold text-center text-white">B. 반대</span>
            <p className="px-20 py-10 text-white text-center">{bContent}</p>
          </div>
        </div>

        {/* 투표 결과 바 */}
        <div className="flex flex-col items-center mb-12 pt-8">
          <h2 className="text-2xl font-bold text-main mb-6">2차 재판 투표 결과</h2>

          <div className="mt-[43px] flex justify-center">
            <div className="relative w-[995px] h-[44px] bg-[rgba(235,146,146,0.46)] rounded-[30px] overflow-hidden flex items-center justify-between px-[20px]">
              <div
                className="absolute left-0 top-0 h-full bg-[#809AD2] rounded-[30px] transition-all duration-500"
                style={{ width: `${ratioA}%` }}
              />
              <div className="relative z-10 flex w-full justify-between items-center px-[20px]">
                <p className="text-white text-[16px] font-bold leading-[150%]">A입장 {ratioA}%</p>
                <p className="text-white text-[16px] font-bold leading-[150%]">B입장 {ratioB}%</p>
              </div>
            </div>
          </div>

          {totalVotes > 0 && (
            <p className="mt-4 text-main text-sm">총 {totalVotes}명이 투표했습니다.</p>
          )}
        </div>

        {/* 최종심 결과보기 */}
        <div className="mt-8 flex justify-center w-full">
          <Button
            variant="trialStart"
            size="lg"
            onClick={() => navigate(PATHS.THIRD_TRIAL)}
            className="w-[585px] h-[123px] rounded-[30px]"
          >
            최종심 결과보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecondTrial_final;