import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import ListPage from "./pages/ListPage";
import ExamplePage from "./pages/ExamplePage";
import MyPage2 from "./pages/MyPage2";
import MyPage from "./pages/Mypage";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
        {/* 예시를 위한 페이지. 추후 삭제. */}
        <Route path="/example" element={<ExamplePage />} />
        <Route path="/mypagetest" element={<MyPage2 />} />
      </Routes>
    </>
  );
}

export default App;
