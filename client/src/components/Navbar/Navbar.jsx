import './Navbar.css'
import logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <div className='nav'>
      <img src={logo} alt="Logo" className='nav-logo' />
      <div className='nav-right'>
        <ul>
          <li className='nav-dis'>Home</li>
        </ul>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
