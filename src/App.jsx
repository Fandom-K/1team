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
        <Route path="/mypage" element={<MyPage2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
