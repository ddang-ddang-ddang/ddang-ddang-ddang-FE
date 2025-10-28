import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constants";

export default function FirstTrialJudge() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-[#FFFFFF] mx-auto w-full max-w-[1440px] min-h-screen">
      {/* 제목 */}
      <h1
        className="text-[38px] font-bold text-[#000000] text-center mt-[78px] mb-[60px]"
        style={{
          fontFamily: "Pretendard",
          lineHeight: "150%",
        }}
      >
        초심
      </h1>

      {/* 판사일러 박스 */}
      <div
        className="flex items-center w-[995px] h-[447px] rounded-[30px] bg-[#E8E8E8] mb-[40px]"
        style={{
          padding: "0 142px",
        }}
      >
        <p
          className="text-[24px] font-bold text-[#000000]"
          style={{
            fontFamily: "Pretendard",
          }}
        >
          판사일러
        </p>
      </div>

      {/* 판결 박스 */}
      <div
        className="relative flex items-center w-[951px] h-[237px] rounded-[30px] bg-[#E8E8E8] mb-[30px]"
        style={{ padding: "0 120px" }}
      >
        {/* 말풍선 꼬리 */}
        <div className="absolute left-[-20px] top-[40px] w-0 h-0 border-t-[20px] border-t-transparent border-r-[20px] border-r-[#E8E8E8] border-b-[20px] border-b-transparent"></div>

        <p
          className="text-[24px] font-bold text-[#000000]"
          style={{
            fontFamily: "Pretendard",
          }}
        >
          판결
        </p>
      </div>

      {/* 결론 박스 */}
      <div
        className="relative flex items-center w-[951px] h-[131px] rounded-[30px] bg-[#E8E8E8] mb-[40px]"
        style={{ padding: "44px 120px" }}
      >
        {/* 말풍선 꼬리 */}
        <div className="absolute left-[-20px] top-[40px] w-0 h-0 border-t-[20px] border-t-transparent border-r-[20px] border-r-[#E8E8E8] border-b-[20px] border-b-transparent"></div>

        <p
          className="text-[24px] font-bold text-[#000000]"
          style={{
            fontFamily: "Pretendard",
          }}
        >
          결론 땅땅땅
        </p>
      </div>

      {/* 회색 진행바 */}
      <div className="w-[951px] h-[44px] bg-[#E8E8E8] rounded-[30px] mb-[60px]"></div>

      {/* 버튼 영역 */}
      <div className="flex gap-[40px] mb-[80px]">
        <button
          className="inline-flex items-center justify-center h-[123px] px-[141px] py-[40px] rounded-[30px] bg-[#E8E8E8] text-[24px] font-semibold text-[#000000] hover:bg-[#d9d9d9]"
          style={{
            fontFamily: "Pretendard",
          }}
          onClick={() => navigate(PATHS.ROOT)}
        >
          여기서 마치기
        </button>

        <button
          className="inline-flex items-center justify-center h-[123px] px-[141px] py-[40px] rounded-[30px] bg-[#E8E8E8] text-[24px] font-semibold text-[#000000] hover:bg-[#d9d9d9]"
          style={{
            fontFamily: "Pretendard",
          }}
          onClick={() => navigate(PATHS.SECOND_TRIAL)}
        >
          2차 심판 가기
        </button>
      </div>
    </div>
  );
}
