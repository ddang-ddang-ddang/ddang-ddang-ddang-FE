import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Textarea from "@/components/common/textarea";
import Button from "@/components/common/Button";
import { PATHS } from "@/constants";

/* 입장문 제출 페이지 */
export default function FirstTrialSubmit() {
  const [selectedSide, setSelectedSide] = useState<"A" | "B" | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [aPosition, setAPosition] = useState("");
  const [bPosition, setBPosition] = useState("");
  const navigate = useNavigate();

  const handleSelect = (side: "A" | "B") => {
    setSelectedSide(side);
    setAlertMessage("");
  };

  const handleSubmit = () => {
    if (!selectedSide) {
      setAlertMessage("입장을 선택해주세요.");
      return;
    }
    navigate(PATHS.FIRST_TRIAL_LOADING);
  };

  return (
    <div className="flex flex-col items-center bg-[#FFFFFF] mx-auto w-full max-w-[1440px] min-h-screen">
      {/* 제목 */}
      <h1
        className="text-[38px] font-bold text-[#000000] text-center mt-[78px] mb-[40px]"
        style={{
          fontFamily: "Pretendard",
          lineHeight: "150%",
        }}
      >
        초심
      </h1>

      {/* 의제 */}
      <div className="flex flex-col w-[995px] bg-[#E8E8E8] rounded-[30px] p-[40px_142px] mb-[40px]">
        <Textarea
          placeholder="의제를 입력하세요. 예시) 전 애인의 물건을 간직하는 것은 단순한 추억일 뿐인가, 감정의 미련인가?"
          className="border-none bg-[#E8E8E8] focus:ring-0 shadow-none text-[24px] font-semibold text-[#000000]"
        />
      </div>

      {/* A측 입장 */}
      <div className="flex flex-col w-[995px] bg-[#E8E8E8] rounded-[30px] p-[40px_142px] mb-[30px]">
        <Textarea
          placeholder="A측 입장을 작성하세요. 예시) 단순한 추억일 뿐이다."
          value={aPosition}
          onChange={(e) => setAPosition(e.target.value)}
          className="border-none bg-[#E8E8E8] focus:ring-0 shadow-none text-[24px] font-semibold text-[#000000]"
        />
      </div>

      {/* A측 근거 */}
      <div className="flex flex-col w-[995px] bg-[#E8E8E8] rounded-[30px] p-[40px_142px] mb-[30px]">
        <Textarea
          placeholder="A측 근거를 작성하세요. 예시) 과거의 물건을 간직한다고 해서 현재의 감정에 영향을 주는 것은 아니다."
          className="border-none bg-[#E8E8E8] focus:ring-0 shadow-none text-[24px] font-semibold text-[#000000]"
        />
      </div>

      {/* B측 입장 */}
      <div className="flex flex-col w-[995px] bg-[#E8E8E8] rounded-[30px] p-[40px_142px] mb-[30px]">
        <Textarea
          placeholder="B측 입장을 작성하세요. 예시) 감정의 미련이다."
          value={bPosition}
          onChange={(e) => setBPosition(e.target.value)}
          className="border-none bg-[#E8E8E8] focus:ring-0 shadow-none text-[24px] font-semibold text-[#000000]"
        />
      </div>

      {/* B측 근거 */}
      <div className="flex flex-col w-[995px] bg-[#E8E8E8] rounded-[30px] p-[40px_142px] mb-[40px]">
        <Textarea
          placeholder="B측 근거를 작성하세요. 예시) 감정의 잔재가 남아 있기 때문에 과거에 대한 미련을 붙잡는 것으로 보일 수 있다."
          className="border-none bg-[#E8E8E8] focus:ring-0 shadow-none text-[24px] font-semibold text-[#000000]"
        />
      </div>

      {/* 입장 선택 */}
      <div className="flex flex-col items-center mb-[20px]">
        <div className="flex gap-[40px] mb-[10px] transition-all">
          {aPosition && (
            <button
              type="button"
              onClick={() => handleSelect("A")}
              className={`w-[373px] h-[97px] rounded-[30px] text-[24px] font-semibold transition-all ${
                selectedSide === "A"
                  ? "bg-[#CFCFCF]"
                  : "bg-[#E8E8E8] hover:bg-[#d9d9d9]"
              }`}
            >
              {aPosition || "A"}
            </button>
          )}

          {bPosition && (
            <button
              type="button"
              onClick={() => handleSelect("B")}
              className={`w-[373px] h-[97px] rounded-[30px] text-[24px] font-semibold transition-all ${
                selectedSide === "B"
                  ? "bg-[#CFCFCF]"
                  : "bg-[#E8E8E8] hover:bg-[#d9d9d9]"
              }`}
            >
              {bPosition || "B"}
            </button>
          )}
        </div>

        {(aPosition || bPosition) && (
          <div
            className="text-[36px] font-bold text-[#000000] mt-[10px]"
            style={{ fontFamily: "Pretendard" }}
          >
            VS
          </div>
        )}
      </div>

      {/* 경고 문구 */}
      <p
        className="text-[24px] font-bold text-[#000000] mb-[10px]"
        style={{ fontFamily: "Pretendard" }}
      >
        제출후에는 의견 수정이 불가능합니다
      </p>

      {/* 제출 버튼 */}
      <Button
        variant="secondary"
        className="w-[380px] h-[123px] rounded-[30px] text-[24px] font-semibold text-[#000000] mb-[40px]"
        onClick={handleSubmit}
      >
        제출하고 재판받기
      </Button>

      {/* 경고 메시지 */}
      {alertMessage && (
        <p className="mt-[8px] text-red-500 text-[20px] font-semibold mb-[20px]">
          {alertMessage}
        </p>
      )}
    </div>
  );
}
