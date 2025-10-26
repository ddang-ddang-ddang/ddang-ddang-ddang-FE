import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FileIcon from "@/assets/svgs/file.svg";

export default function FirstTrialLoading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/first-trial/result");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

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
          title="입장문 제출중 아이콘"
        />
        <p
          className="text-[36px] font-bold text-[#000000]"
          style={{ fontFamily: "Pretendard", lineHeight: "normal" }}
        >
          입장문 제출중..
        </p>
      </div>
    </div>
  );
}
