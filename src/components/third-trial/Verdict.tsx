import Button from "@/components/common/Button";
import { useThirdTrialStore } from "@/stores/thirdTrialStore";

export default function Verdict() {
  const reset = useThirdTrialStore((s) => s.reset);
  const prev = useThirdTrialStore((s) => s.prev);
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">판결</h1>
      <p className="text-gray-700">최종 판결이 도출되었습니다.</p>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={prev}>이전</Button>
        <Button onClick={reset}>처음으로</Button>
      </div>
    </div>
  );
}

