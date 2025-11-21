import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useThirdTrialStore } from "@/stores/thirdTrialStore";
import Adopt from "@/components/third-trial/Adopt";
import SelectionReview from "@/components/third-trial/SelectionReview";
import Loading from "@/components/third-trial/Loading";
import Verdict from "@/components/third-trial/Verdict";

export default function ThirdTrialPage() {
  const { caseId: caseIdParam } = useParams<{ caseId: string }>();
  const { step, setCaseId, caseId: storedCaseId } = useThirdTrialStore();

  // URL 파라미터에서 caseId를 가져와 store에 설정
  useEffect(() => {
    if (caseIdParam) {
      const id = Number(caseIdParam);
      if (!isNaN(id) && id !== storedCaseId) {
        setCaseId(id);
      }
    }
  }, [caseIdParam, setCaseId, storedCaseId]);

  if (step === "adopt") return <Adopt />;
  if (step === "review") return <SelectionReview />;
  if (step === "loading") return <Loading />;
  if (step === "verdict") return <Verdict />;

  return null;
}
