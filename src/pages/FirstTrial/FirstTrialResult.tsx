import { useNavigate } from "react-router-dom";
import FileIcon from "@/assets/svgs/file.svg";
import { PATHS } from "@/constants";

export default function FirstTrialResult() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-[#FFFFFF] mx-auto w-full max-w-[1440px] min-h-screen">
      {/* 제목 */}
      <h1
        className="text-[38px] font-bold text-[#000000] text-center mt-[78px]"
        style={{
          fontFamily: "Pretendard",
          lineHeight: "150%",
        }}
      >
        초심
      </h1>

      {/* 파일 아이콘 박스 */}
      <div
        className="flex flex-col items-center justify-center mt-[100px] rounded-[100px] bg-[#E8E8E8]"
        style={{
          width: "395px",
          height: "448px",
        }}
      >
        {/* 아이콘 */}
        <FileIcon
          className="w-[229px] h-[229px] mb-[20px]"
          title="판결 완료 아이콘"
        />

        {/* 텍스트 */}
        <p
          className="text-[36px] font-bold text-[#000000]"
          style={{
            fontFamily: "Pretendard",
            lineHeight: "normal",
          }}
        >
          판결 완료!
        </p>
      </div>

      {/* AI 판결 보기 버튼 */}
      <button
        onClick={() => navigate(PATHS.AI_JUDGE)}
        className="mt-[40px] h-[123px] px-[101px] py-[40px] bg-[#E8E8E8] rounded-[30px] text-[24px] font-semibold text-[#000000] hover:bg-[#d9d9d9]"
        style={{
          fontFamily: "Pretendard",
        }}
      >
        AI 판결 보기
      </button>
    </div>
  );
}
