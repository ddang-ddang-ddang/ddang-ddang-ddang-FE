import Button from "@/components/common/Button";
import { useThirdTrialStore } from "@/stores/thirdTrialStore";

export default function Adopt() {
  const setStep = useThirdTrialStore((s) => s.setStep);
  
  return (
    <div className="mx-auto flex flex-col items-center gap-8 p-8">
      <h1 className="text-4xl font-bold">최종심 변론 채택</h1>

      <div className="flex flex-col gap-4">
        <div className="w-6xl bg-gray-500 h-72 flex justify-center items-center">
          A 의견
        </div>
        <div className="flex justify-between">
          <p>최종심의 변호는 최대 N개까지 채택이 가능합니다</p>
          <Button>변론 채택 완료</Button>
        </div>
      </div>
      <p className="text-gray-700">채택할 변론을 선택해주세요.</p>
      <Button onClick={() => setStep("waiting")}>다음</Button>
    </div>
  );
}
