import Login from "./login";
import Dashboard from "./dashboard";
import { Routes, Route } from "react-router-dom";
import ActiveCourse from "./ActiveCourse";
import MainPage from "./mainpage";
import Attendance from "./Attendance/index";
import AttendanceSheet from "./attendancesheet";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<MainPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="active" element={<ActiveCourse />} />
        <Route path="active/attendance" element={<Attendance />} />
        <Route path="sheet" element={<AttendanceSheet />} />
      </Route>
    </Routes>
  );
}

export default App;
