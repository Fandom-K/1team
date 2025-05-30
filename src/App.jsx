
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import ListPage from "./pages/ListPage";
import MyPage from "./pages/Mypage";


function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
}

export default App;
