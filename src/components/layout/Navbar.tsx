import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import Logo from "@/assets/svgs/logo.svg"; // 로고는 우선 svg로 받아왔는데 로고 확정되면 수정 예정
import { HIDE_NAV_STEPS_BY_PATH, PATHS } from "@/constants";
import { useThirdTrialStore } from "@/stores/thirdTrialStore";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 경로와 스텝에 따라 네브바 노출 제어
  let hide = false;
  const step = useThirdTrialStore((s) => s.step);
  
  if (pathname === PATHS.THIRD_TRIAL) {
    const hiddenSet = HIDE_NAV_STEPS_BY_PATH[PATHS.THIRD_TRIAL];
    hide = hiddenSet?.has(step) ?? false;
  }

  if (hide) return null;

  return (
    <nav
      className="flex items-center justify-between w-full h-[98px] bg-[#203C77] 
                    px-6 sm:px-10 md:px-[40px] lg:px-[60px]"
    >
      {/* 로고 */}
      <button
        type="button"
        onClick={() => navigate(PATHS.ROOT)}
        className="inline-flex items-center"
      >
        <img
          src={Logo}
          alt="땅!땅!땅! 로고"
          className="h-[40px] sm:h-[46.88px] w-auto"
        />
      </button>

      {/* 로그인 버튼 */}
      <Button
        variant="navbar"
        onClick={() => navigate(PATHS.LOGIN)}
        className="h-[40px] sm:h-[44px] px-[30px] sm:px-[37px]"
      >
        LOGIN
      </Button>
    </nav>
  );
}
