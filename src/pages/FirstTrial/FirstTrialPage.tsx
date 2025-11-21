import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirstTrialStore } from "@/stores/firstTrialStore";
import Start from "@/components/first-trial/Start";
import Submit from "@/components/first-trial/Submit";
import Loading from "@/components/first-trial/Loading";
import Result from "@/components/first-trial/Result";
import Judge from "@/components/first-trial/Judge";
import VsSubmit from "@/components/first-trial/VsSubmit";

export default function FirstTrialPage() {
  const { caseId: caseIdParam } = useParams<{ caseId: string }>();
  const { step, setCaseId, caseId: storedCaseId } = useFirstTrialStore();

  // URL 파라미터에서 caseId를 가져와 store에 설정
  useEffect(() => {
    if (caseIdParam) {
      const id = Number(caseIdParam);
      if (!isNaN(id) && id !== storedCaseId) {
        setCaseId(id);
      }
    }
  }, [caseIdParam, setCaseId, storedCaseId]);

  if (step === "start") return <Start />;
  if (step === "submit") return <Submit />;
  if (step === "vsSubmit") return <VsSubmit />;
  if (step === "loading") return <Loading />;
  if (step === "result") return <Result />;
  return <Judge />;
}
