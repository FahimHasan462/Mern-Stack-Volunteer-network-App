import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import AdminDashboard from "./pages/admin";
import VolunteerDashboard from "./pages/volunteer";
import HelpseekerDashboard from "./pages/helpseeker";
import { Volunteerlist ,EditProfile} from "./pages/function";
import { NewUser } from "./pages/newuser";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/newuser" element={< NewUser/>} />
        {/*admin-dashborad */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/volunteerlist" element={<Volunteerlist />} />
        {/*volunteer-dashborad */}
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard/>} />
        <Route path="/volunteer-dashboard/editprofile" element={<EditProfile/>} />
        {/*helpseeker-dashborad */}
        <Route path="/helpseeker-dashboard" element={<HelpseekerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
