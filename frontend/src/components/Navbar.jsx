import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="LearnICT Logo" />
      </div>

      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/students">Students</Link>
        <Link to="/units">Units</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/marks">Marks</Link>
        <Link to="/performance">Performance</Link>
        <Link to="/prediction">Prediction</Link>
      </div>
    </div>
  );
}

export default Navbar;