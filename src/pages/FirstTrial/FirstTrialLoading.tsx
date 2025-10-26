import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fileIcon from "@/assets/svgs/file.svg";

export default function FirstTrialLoading() {
  const navigate = useNavigate();

  // 2초 후 결과 페이지로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/first-trial/result");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

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
        <img
          src={fileIcon}
          alt="입장문 제출중 아이콘"
          className="w-[229px] h-[229px] mb-[20px]"
        />

        {/* 텍스트 */}
        <p
          className="text-[36px] font-bold text-[#000000]"
          style={{
            fontFamily: "Pretendard",
            lineHeight: "normal",
          }}
        >
          입장문 제출중..
        </p>
      </div>
    </div>
  );
}
