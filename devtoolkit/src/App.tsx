import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import ToolPage from "./pages/ToolPage";
import PageViewTracker from "./components/analytics/PageViewTracker";

function App() {
  return (
    <BrowserRouter>
      <PageViewTracker />

      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/tools/:toolId"
            element={<ToolPage />}
          />

          <Route
            path="*"
            element={<ToolPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
