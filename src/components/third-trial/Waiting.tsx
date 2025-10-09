import Button from "@/components/common/Button";
import DownArrow from "@/assets/svgs/DownArrow.svg";
import { useThirdTrialStore } from "@/stores/thirdTrialStore";

export default function Waiting() {
  const prev = useThirdTrialStore((s) => s.prev);
  const next = useThirdTrialStore((s) => s.next);
  return (
    <div className="mx-auto flex flex-col items-center gap-8 p-8">
      <h1 className="text-2xl font-bold">최종심 변론 채택</h1>
      <div className="flex flex-col gap-7 max-w-6xl w-full items-center">
        <div className="w-full max-w-5xl py-7 px-30 text-3xl bg-gray-400 rounded-3xl">A의견</div>
        <div className="w-full flex bg-gray-500 max-h-36 justify-between items-center px-9 py-3 rounded-3xl">
          <div className="">profile</div>
          <div className="">변론 내용</div>
          <DownArrow/>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={prev}>다른 의견 채택하기</Button>
        <Button onClick={next}>최종 재판 가기</Button>
      </div>
    </div>
  );
}
