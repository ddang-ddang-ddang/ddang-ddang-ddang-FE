import { useNavigate } from "react-router-dom";
import FileIcon from "@/assets/svgs/file.svg";

export default function FirstTrialResult() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-[#FFFFFF] mx-auto w-full max-w-[1440px] min-h-screen">
      <h1
        className="text-[38px] font-bold text-[#000000] text-center mt-[78px]"
        style={{ fontFamily: "Pretendard", lineHeight: "150%" }}
      >
        초심
      </h1>

      <div
        className="flex flex-col items-center justify-center mt-[100px] rounded-[100px] bg-[#E8E8E8]"
        style={{ width: "395px", height: "448px" }}
      >
        <FileIcon
          className="w-[229px] h-[229px] mb-[20px]"
          title="판결 완료 아이콘"
        />
        <p
          className="text-[36px] font-bold text-[#000000]"
          style={{ fontFamily: "Pretendard", lineHeight: "normal" }}
        >
          판결 완료!
        </p>
      </div>
      <button
        onClick={() => navigate("/first-trial/judge")}
        className="mt-[78px] flex justify-center items-center h-[123px] px-[102px] py-[40px] bg-[#E8E8E8] rounded-[30px] text-[36px] font-bold text-[#000000] leading-[1.2] tracking-[0.02em] hover:bg-[#d9d9d9] mb-[120px]"
        style={{ fontFamily: "Pretendard" }}
      >
        AI 판결 보기
      </button>
    </div>
  );
}
