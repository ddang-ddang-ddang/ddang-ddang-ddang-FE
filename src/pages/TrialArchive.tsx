import React, { useState, useMemo } from "react";
import { useFinishedCasesQuery, useFinalJudgmentHistoryQuery } from "@/hooks/cases/useCases";
import ArchiveTrialTable from "@/components/trial/ArchiveTrialTable";
import Pagination from "@/components/vs-mode/Pagination";
import Button from "@/components/common/Button";
import clsx from "clsx";

const TrialArchive: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 완료된 재판 목록 조회
  const { data: finishedCasesRes, isLoading } = useFinishedCasesQuery();
  const finishedCases = finishedCasesRes?.result ?? [];

  // 선택된 케이스의 판결 히스토리 조회
  const { data: historyRes, isLoading: isHistoryLoading } = useFinalJudgmentHistoryQuery(
    selectedCaseId ?? 0
  );
  const judgmentHistory = historyRes?.result ?? [];

  // 아카이브 테이블 형식에 맞게 데이터 변환
  const cases = useMemo(() => {
    return finishedCases.map(finishedCase => {
      const [argumentAMain = "A 주장", argumentBMain = "B 주장"] = finishedCase.mainArguments ?? [];
      return {
        caseId: finishedCase.caseId,
        title: finishedCase.title || "제목 없음",
        argumentAMain,
        argumentBMain,
        authorNickname: "",
        rivalNickname: "",
        status: finishedCase.status,
        createdAt: "",
        completedAt: "",
      };
    });
  }, [finishedCases]);

  // 최신 사건 순 정렬 (caseId 내림차순)
  const sortedCases = useMemo(() => {
    return [...cases].sort((a, b) => b.caseId - a.caseId);
  }, [cases]);

  // 전체 데이터 개수
  const totalCount = sortedCases.length;

  // 페이지네이션 계산
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCases = sortedCases.slice(startIndex, startIndex + itemsPerPage);

  const handleCaseClick = (caseId: number) => {
    setSelectedCaseId(caseId);
  };

  const handleCloseHistory = () => {
    setSelectedCaseId(null);
  };

  const getTrialLabel = (index: number, totalLength: number) => {
    // 역순이므로 마지막 항목이 1차 재판
    if (index === totalLength - 1) {
      return "1차 재판 (초심)";
    }
    return "3차 재판 (최종심)";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-main font-bold">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-98px)] bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#203C77] mb-3">
            재판 아카이브
          </h1>
          <p className="text-gray-500">
            완료된 재판의 결과를 확인하고, 다양한 논쟁의 결론을 살펴보세요!
          </p>
        </div>

        {/* 테이블 */}
        <ArchiveTrialTable
          cases={currentCases}
          startIndex={startIndex}
          totalCount={totalCount}
          onCaseClick={handleCaseClick}
        />

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* 판결 히스토리 모달 */}
        {selectedCaseId && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleCloseHistory}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 모달 헤더 */}
              <div className="sticky top-0 bg-white border-b-2 border-main-bright p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-main">
                  사건 #{selectedCaseId} 재판 히스토리
                </h2>
                <button
                  onClick={handleCloseHistory}
                  className="text-gray-500 hover:text-main text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* 모달 내용 */}
              <div className="p-6">
                {isHistoryLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <p className="text-main font-bold">로딩 중...</p>
                  </div>
                ) : judgmentHistory.length === 0 ? (
                  <div className="flex justify-center items-center py-20">
                    <p className="text-gray-500">판결 히스토리가 없습니다.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {[...judgmentHistory].reverse().map((judgment, index) => (
                      <div
                        key={index}
                        className={clsx(
                          "border-2 rounded-xl p-6",
                          index === 0
                            ? "border-yellow-400 bg-yellow-50"
                            : "border-gray-300 bg-gray-50"
                        )}
                      >
                        {/* 재판 단계 */}
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold text-main">
                            {getTrialLabel(index, judgmentHistory.length)}
                          </h3>
                          {index === 0 && (
                            <span className="bg-yellow-400 text-white text-sm px-3 py-1 rounded-full font-semibold">
                              최근 판결
                            </span>
                          )}
                        </div>

                        {/* 승률 바 */}
                        <div className="mb-4">
                          <div className="relative w-full h-10 bg-red-200 rounded-full overflow-hidden">
                            <div
                              className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                              style={{ width: `${judgment.ratioA ?? 50}%` }}
                            ></div>
                            <div className="absolute inset-0 flex justify-between items-center px-4 text-white font-bold text-sm">
                              <span>A {judgment.ratioA ?? 0}%</span>
                              <span>B {judgment.ratioB ?? 0}%</span>
                            </div>
                          </div>
                        </div>

                        {/* 판결문 */}
                        {judgment.verdict && (
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-main mb-2">
                              판결문
                            </h4>
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                              {judgment.verdict}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 모달 푸터 */}
              <div className="sticky bottom-0 bg-white border-t-2 border-main-bright p-6 flex justify-end">
                <Button onClick={handleCloseHistory} variant="primary">
                  닫기
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrialArchive;
