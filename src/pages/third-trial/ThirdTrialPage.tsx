import { useThirdTrialStore } from "@/stores/thirdTrialStore";
import Adopt from "@/components/third-trial/Adopt";
import Waiting from "@/components/third-trial/Waiting";
import Loading from "@/components/third-trial/Loading";
import Verdict from "@/components/third-trial/Verdict";

export default function ThirdTrialPage() {
  const step = useThirdTrialStore((s) => s.step);

  if (step === "adopt") return <Adopt />;
  if (step === "waiting") return <Waiting />;
  if (step === "loading") return <Loading />;
  return <Verdict />;
}
