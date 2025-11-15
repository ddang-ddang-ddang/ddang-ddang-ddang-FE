// dev/src/pages/SecondTrial/SecondTrialRegister.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "@/components/common/Button";
import { PATHS } from "@/constants";
import { useStartSecondTrialMutation } from "@/hooks/secondTrial/useSecondTrial";

// 기존 UI용 더미 데이터 (변경 없음)
const MOCK_DEBATE_DATA = {
  id: 1,
  timeLimit: "마감",
  situation:
    "깻잎 논쟁: 내 연인이 친구의 깻잎을 떼어주는 것을 허용해야 하는가?",
  argumentA:
    "연인을 배려하는 행동이며, 사소한 일에 질투하는 것은 속이 좁은 것이다.",
  argumentB:
    "연인과 친구 사이에 무의식적인 친밀감을 형성하는 행동이며, 오해의 소지가 있다.",
  isArgumentTime: false,
  isVoteTime: false,
};

const SecondTrialRegister: React.FC = () => {
  const [duration, setDuration] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams<{ caseId?: string }>();
  const location = useLocation();
  const startSecond = useStartSecondTrialMutation();

  // 여러 경로에서 caseId 복구: URL param / navigation state / query string / localStorage
  const getCaseIdFromSearch = (): number | undefined => {
    try {
      const search = location.search;
      if (!search) return undefined;
      const qs = new URLSearchParams(search);
      const v = qs.get("caseId") ?? qs.get("id");
      if (!v) return undefined;
      const n = Number(v);
      return Number.isNaN(n) ? undefined : n;
    } catch {
      return undefined;
    }
  };

  const resolveCaseIdOnce = (): number | undefined => {
    // 1) URL param
    if (params?.caseId) {
      const n = Number(params.caseId);
      if (!Number.isNaN(n)) return n;
    }

    // 2) navigation state (navigate('/path', { state: { caseId } }))
    const stateAny = (location && (location as any).state) || {};
    const stateCaseId = stateAny?.caseId ?? stateAny?.id ?? stateAny?.case?.id;
    if (stateCaseId) {
      const n = Number(stateCaseId);
      if (!Number.isNaN(n)) return n;
    }

    // 3) querystring
    const fromQs = getCaseIdFromSearch();
    if (fromQs) return fromQs;

    // 4) localStorage fallback (1차 재판에서 저장해뒀다면)
    const stored = localStorage.getItem("lastCaseId");
    if (stored) {
      const n = Number(stored);
      if (!Number.isNaN(n)) return n;
    }

    return undefined;
  };

  const [caseId, setCaseId] = useState<number | undefined>(() => resolveCaseIdOnce());

  // location/state가 페이지 진입 후에 바뀔 수 있으므로 안전하게 재시도
  useEffect(() => {
    if (!caseId) {
      const resolved = resolveCaseIdOnce();
      if (resolved) setCaseId(resolved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key, location.search, (location as any).state, params?.caseId]);

  const handleStartClick = async () => {
    if (!caseId) {
      alert("케이스 ID가 없습니다. 1차 재판에서 넘어온 caseId를 확인해 주세요.");
      return;
    }

    try {
      await startSecond.mutateAsync(caseId);
      // 성공 시 기존 동작(페이지 이동) 유지
      navigate(PATHS.SECOND_TRIAL_ROUND_ONE);
    } catch (err) {
      console.error("2차 재판 시작 실패:", err);
      alert("2차 재판 시작에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 gap-y-10 pb-30">
      <h1 className="text-2xl font-bold text-center text-main">2차 재판 등록</h1>

      <div className="flex gap-[31px]">
        <div className="w-[513px] h-[447px] bg-main-medium rounded-[30px] flex justify-center items-center flex-col">
          <span className="text-2xl font-bold text-center text-white">A. 찬성</span>
          <p className="px-20 py-10 text-white">{MOCK_DEBATE_DATA.argumentA}</p>
        </div>
        <div className="w-[513px] h-[447px] bg-main-red rounded-[30px] flex justify-center items-center flex-col">
          <span className="text-2xl font-bold text-center text-white">B. 반대</span>
          <p className="px-20 py-10 text-white">{MOCK_DEBATE_DATA.argumentB}</p>
        </div>
      </div>

      <div className="w-[1058px] flex justify-center items-center pb-6">
        <h1 className="text-main text-24px">{MOCK_DEBATE_DATA.situation}</h1>
      </div>

      <h1 className="text-2xl font-bold text-center text-main">변호 종료 시간 설정</h1>

      <select
        id="durationSelect"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="
          w-[585px] h-[123px]
          bg-main-bright
          rounded-[30px]
          text-lg font-bold text-center
          flex items-center justify-center
          focus:outline-none focus:ring-2 focus:ring-main-medium
          text-main
        "
      >
        <option value="">시간 선택</option>
        <option value="1">1시간</option>
        <option value="2">2시간</option>
        <option value="3">3시간</option>
        <option value="12">12시간</option>
        <option value="24">24시간</option>
        <option value="48">48시간</option>
        <option value="72">72시간</option>
      </select>

      <Button
        variant="trialStart"
        size="lg"
        className="w-[585px] h-[123px] rounded-[30px]"
        onClick={handleStartClick}
        disabled={startSecond.isPending}
      >
        {startSecond.isPending ? "시작 요청중..." : "2차 재판 시작하기"}
      </Button>
    </div>
  );
};

export default SecondTrialRegister;