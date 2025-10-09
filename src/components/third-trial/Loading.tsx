import { useEffect } from "react";
import { useThirdTrialStore } from "@/stores/thirdTrialStore";
import VerdictLoadingGif from "@/assets/gifs/판결 영상.gif";

export default function Loading() {
  const next = useThirdTrialStore((s) => s.next);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("?")
      next();
    }, 3000); // GIF 길이: 3초
    return () => clearTimeout(timer);
  }, [next]);

  return (
    <div className="w-full h-[calc(100vh-98px)] flex flex-col items-center justify-center">
      <p className="text-gray-600 mt-4">잠시만 기다려주세요…</p>
      <img
        src={VerdictLoadingGif}
        alt="판결 로딩 애니메이션"
        className="w-auto max-h-[calc(100vh-98px)] rounded-lg shadow"
      />
    </div>
  );
}
