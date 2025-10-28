// src/pages/SecondTrialPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import { PATHS } from "@/constants";

const SecondTrialRegister: React.FC = () => {
  const [duration, setDuration] = useState<string>('');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center pt-10 gap-y-10">
      <h1 className="text-2xl font-bold text-center">
        2차 재판 등록
      </h1>

      <div className="flex gap-[31px]">
        <div className="w-[513px] h-[447px] bg-[#E8E8E8] rounded-[30px] flex justify-center items-center">
          <span className="text-2xl font-bold text-center">
            A. 찬성 {/* api 통해 값 넣기 */}
          </span>
        </div>
        <div className="w-[513px] h-[447px] bg-[#E8E8E8] rounded-[30px] flex justify-center items-center">
          <span className="text-2xl font-bold text-center">
            B. 반대 {/* api 통해 값 넣기 */}
          </span>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center">
        변호 종료 시간
      </h1>

      <select
        id="durationSelect"
        value={duration}
        onChange={e => setDuration(e.target.value)}
        className="
          w-[585px] h-[123px]
          bg-[#E8E8E8]
          rounded-[30px]
          text-lg font-bold text-center
          flex items-center justify-center
          focus:outline-none focus:ring-2 focus:ring-blue-400
        "
      >
        <option value="">선택</option>
        <option value="1">1시간</option>
        <option value="2">2시간</option>
        <option value="3">3시간</option>
        <option value="12">12시간</option>
        <option value="24">24시간</option>
        <option value="48">48시간</option>
        <option value="72">72시간</option>
      </select>

      <Button
        variant="primary"
        size="lg"
        className="w-[585px] h-[123px] rounded-[30px]"
        onClick={() => navigate(PATHS.SECOND_TRIAL_ROUND_ONE)}
      >
        2차 재판 시작
      </Button>
    </div>
  );
};

export default SecondTrialRegister;