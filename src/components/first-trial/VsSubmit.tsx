import Button from "@/components/common/Button";
import Textarea from "@/components/common/textarea";
import { useFirstTrialStore } from "@/stores/firstTrialStore";

/* VS모드 입장 제출 페이지 */
export default function Submit() {
  const { setStep } = useFirstTrialStore();

  /* 제출 버튼 클릭 시 다음 단계로 이동 */
  const handleSubmit = () => {
    setStep("loading");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[Pretendard] text-[#203C77]">
      {/* 상단 제목 + VS모드 표시 */}
      <div className="flex items-center justify-between w-[995px] mt-[60px]">
        <h1 className="text-[38px] font-bold text-center flex-1">초심</h1>

        <div className="bg-[#EB9292] text-white px-4 py-2 rounded-[15px] text-[18px] font-normal">
          VS모드
        </div>
      </div>

      {/* 밸런스 게임 상황 설명 입력 */}
      <div className="mt-[40px] w-[995px] h-[96px] bg-[#E8F2FF] rounded-[15px] flex items-center px-[56px]">
        <Textarea
          placeholder="밸런스 게임의 배경 상황을 설명해주세요."
          className="bg-[#E8F2FF] border-none text-[20px] text-[#203C77] w-full h-full resize-none outline-none placeholder-[#809AD2] font-normal"
        />
      </div>

      {/* 입장 작성 */}
      <div className="mt-[60px] w-[995px]">
        <h2 className="text-[24px] font-bold mb-[15px]">내 입장</h2>

        <div className="bg-[#E8F2FF] h-[96px] rounded-[15px] mb-[20px] flex items-center px-[56px]">
          <Textarea
            placeholder="입장을 작성해주세요."
            className="bg-[#E8F2FF] border-none text-[20px] text-[#203C77] w-full h-full resize-none outline-none placeholder-[#809AD2] font-normal"
          />
        </div>

        <div className="bg-[#E8F2FF] h-[259px] rounded-[15px] flex items-start px-[56px] pt-[34px]">
          <Textarea
            placeholder="입장을 뒷받침하는 논리적인 근거를 작성해주세요."
            className="bg-[#E8F2FF] border-none text-[20px] text-[#203C77] w-full resize-none outline-none placeholder-[#809AD2] font-normal leading-[1.6]"
          />
        </div>
      </div>

      {/* 안내 문구 (고정 텍스트) */}
      <div className="mt-[80px] h-[32px] text-center">
        <p className="text-[24px] text-[#809AD2] font-normal">
          제출 후에는 의견 수정이 불가능합니다
        </p>
      </div>

      {/* 제출 버튼 */}
      <div className="mt-[12px] mb-[120px]">
        <Button
          variant="trialStart"
          size="lg"
          className="w-[380px] h-[123px] text-[36px] font-bold rounded-[15px]"
          onClick={handleSubmit}
        >
          상대의견 기다리기
        </Button>
      </div>
    </div>
  );
}
