import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import UnitsPage from "./pages/UnitsPage";
import AttendancePage from "./pages/AttendancePage";
import MarksPage from "./pages/MarksPage";
import PerformancePage from "./pages/PerformancePage";
import PredictionPage from "./pages/PredictionPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/units" element={<UnitsPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/marks" element={<MarksPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/prediction" element={<PredictionPage />} />
      </Routes>
    </Router>
  );
}

export default App;