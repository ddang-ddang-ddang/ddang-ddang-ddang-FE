import { Route, Routes } from "react-router-dom";
import Main from "@/pages/Main";
import MyPage from "@/pages/MyPage";
import Navbar from "@/components/layout/Navbar";
import Login from "./pages/login/LoginPage";
import ThirdTrialPage from "@/pages/third-trial/ThirdTrialPage";
import SecondTrialRegister from "./pages/SecondTrial/SecondTrialRegister";
import SecondTrial_1 from "./pages/SecondTrial/SecondTrial_1";
import FirstTrialStart from "@/pages/FirstTrial/FirstTrialStart";
import FirstTrialSubmit from "@/pages/FirstTrial/FirstTrialSubmit";
import FirstTrialLoading from "@/pages/FirstTrial/FirstTrialLoading";
import FirstTrialResult from "@/pages/FirstTrial/FirstTrialResult";
import FirstTrialJudge from "./pages/FirstTrial/FirstTrialJudge";
import NotFound from "@/pages/NotFound";
import { PATHS } from "@/constants";

function App() {
  return (
    <>
      {/* 전역 네브바 */}
      <Navbar />

      {/* 라우팅 영역 */}
      <Routes>
        <Route path={PATHS.ROOT} element={<Main />} />
        <Route path={PATHS.MY_PAGE} element={<MyPage />} />
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.THIRD_TRIAL} element={<ThirdTrialPage />} />
        <Route path={PATHS.SECOND_TRIAL} element={<SecondTrialRegister />} />
        <Route
          path={PATHS.SECOND_TRIAL_REGISTER}
          element={<SecondTrialRegister />}
        />
        <Route path="/secondtrial/1" element={<SecondTrial_1 />} />
        <Route path="/firsttrial/start" element={<FirstTrialStart />} />
        <Route path="/firsttrial/submit" element={<FirstTrialSubmit />} />
        <Route path="/first-trial/loading" element={<FirstTrialLoading />} />
        <Route path="/first-trial/result" element={<FirstTrialResult />} />
        <Route path="/ai-judge" element={<FirstTrialJudge />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
