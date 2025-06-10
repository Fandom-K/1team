import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import ListPage from "./pages/ListPage";
import MyPage2 from "./pages/Mypage2";
import ExamplePage from "./pages/ExamplePage";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/mypage" element={<MyPage2 />} />
        <Route path="*" element={<NotFound />} />
        {/* 예시를 위한 페이지. 추후 삭제. */}
        <Route path="/example" element={<ExamplePage />} />
      </Routes>
    </>
  );
}

export default App;
