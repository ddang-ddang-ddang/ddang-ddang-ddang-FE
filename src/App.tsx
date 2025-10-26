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

function App() {
  return (
    <>
      {/* 전역 네브바 */}
      <Navbar />

      {/* 라우팅 영역 */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/third-trial" element={<ThirdTrialPage />} />
        <Route path="/secondtrial/register" element={<SecondTrialRegister />} />
        <Route path="/secondtrial/1" element={<SecondTrial_1 />} />
        <Route path="/firsttrial/start" element={<FirstTrialStart />} />
        <Route path="/firsttrial/submit" element={<FirstTrialSubmit />} />
        <Route path="/first-trial/loading" element={<FirstTrialLoading />} />
        <Route path="/first-trial/result" element={<FirstTrialResult />} />
        <Route path="/ai-judge" element={<FirstTrialJudge />} />
      </Routes>
    </>
  );
}

export default App;
