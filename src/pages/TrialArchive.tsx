import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_BUILDERS } from "@/constants";
import ArchiveTrialTable from "@/components/trial/ArchiveTrialTable";
import Pagination from "@/components/vs-mode/Pagination";
import { useAllArchivedCasesQuery } from "@/hooks/cases/useCases";

const TrialArchive: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 전체 아카이브 조회
  const { data: archivedCasesRes, isLoading } = useAllArchivedCasesQuery();
  const judgments = archivedCasesRes?.result ?? [];

  // 아카이브 테이블 형식에 맞게 데이터 변환
  const cases = useMemo(() => {
    return judgments.map(judgment => ({
      caseId: judgment.caseId,
      title: judgment.title || "제목 없음",
      argumentAMain: "",
      argumentBMain: "",
      authorNickname: "",
      rivalNickname: "",
      winner: judgment.verdict as "A" | "B" || "A",
      winnerNickname: "",
      status: "완료",
      createdAt: judgment.createdAt || "",
      completedAt: judgment.completedAt || "",
    }));
  }, [judgments]);

  // 완료순 정렬 (completedAt 기준 내림차순, 오래된 순이 아님)
  const sortedCases = useMemo(() => {
    return [...cases].sort(
      (a, b) => {
        const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
        const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
        return dateB - dateA;
      }
    );
  }, [cases]);

  // 전체 데이터 개수
  const totalCount = sortedCases.length;

  // 페이지네이션 계산
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCases = sortedCases.slice(startIndex, startIndex + itemsPerPage);

  const handleCaseClick = (caseId: number) => {
    // 2차 재판 결과 페이지로 이동
    navigate(PATH_BUILDERS.secondTrialFinal(caseId));
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
      </div>
    </div>
  );
};

export default TrialArchive;
