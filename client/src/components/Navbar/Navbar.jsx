import './Navbar.css';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="nav-logo" />

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/challenges">Challenges</Link>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
      </div>
    </nav>
  );
};

export default Navbar;
