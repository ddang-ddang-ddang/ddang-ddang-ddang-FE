import { Route, Routes } from "react-router-dom";
import Main from "@/pages/Main";
import MyPage from "@/pages/MyPage";
import Navbar from "@/components/layout/Navbar";
import Login from "./pages/login/LoginPage";
import SecondTrialRegister from "./pages/SecondTrial/SecondTrialRegister";
import SecondTrial_1 from "./pages/SecondTrial/SecondTrial_1";

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
        <Route path="/secondtrial/register" element={<SecondTrialRegister />} />
        <Route path="/secondtrial/1" element={<SecondTrial_1 />} />
      </Routes>
    </>
  );
}

export default App;
