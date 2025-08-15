import { Link } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-main-name">
        <Link to="/">Movie Checker</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/checks" className="nav-link nav-btn">
          Checks
        </Link>
      </div>
    </nav>
  );
}
