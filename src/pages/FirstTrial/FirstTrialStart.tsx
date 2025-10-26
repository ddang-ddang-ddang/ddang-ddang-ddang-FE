import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";

/* 초심 - 재판 시작 선택 페이지 */
export default function FirstTrialStart() {
  const navigate = useNavigate();

  const handleSoloMode = () => {
    navigate("/firsttrial/submit");
  };

  return (
    <div className="flex flex-col items-center bg-[#FFFFFF] mx-auto w-full max-w-[1440px] min-h-screen">
      {/* 제목 영역 */}
      <h1
        className="text-[30px] font-bold text-[#000000] mt-[78px] mb-[60px]"
        style={{
          fontFamily: "Pretendard",
          lineHeight: "150%",
        }}
      >
        밸런스 재판 시작하기
      </h1>

      {/* 버튼 그룹 */}
      <div className="flex gap-[40px] justify-center">
        <Button
          variant="secondary"
          className="w-[380px] h-[123px] rounded-[30px] text-[24px] font-semibold text-[#000000] hover:opacity-80 transition"
          onClick={handleSoloMode}
        >
          솔로모드
        </Button>

        <Button
          variant="secondary"
          className="w-[380px] h-[123px] rounded-[30px] text-[24px] font-semibold text-[#000000] hover:opacity-80 transition"
        >
          VS모드 + a...
        </Button>
      </div>
    </div>
  );
}
