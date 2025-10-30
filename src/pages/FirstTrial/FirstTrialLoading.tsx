import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FileIcon from "@/assets/svgs/file.svg";
import { PATHS } from "@/constants";

export default function FirstTrialLoading() {
  const navigate = useNavigate();

  // 2초 후 결과 페이지로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(PATHS.FIRST_TRIAL_RESULT);
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center bg-white mx-auto w-full max-w-[1440px] min-h-screen text-[#203C77] font-[Pretendard]">
      {/* 제목 */}
      <h1 className="text-[38px] font-bold text-center mt-[78px] leading-relaxed">
        초심
      </h1>

      {/* 파일 아이콘 박스 */}
      <div className="flex flex-col items-center justify-center mt-[100px] w-[395px] h-[448px] rounded-[100px] bg-main-medium/20">
        {/* 아이콘 */}
        <FileIcon
          className="w-[229px] h-[229px] mb-[20px]"
          title="입장문 제출중 아이콘"
        />

        {/* 텍스트 */}
        <p className="text-[36px] font-bold leading-tight">입장문 제출중..</p>
      </div>
    </div>
  );
}
