import './Navbar.css'

const Navbar = () => {
  return (
    <div className='nav'>
      <img src={assets.logo.png} alt="" className='nav-logo'/>
      <ul className="nav-menu">
        <li className='nav-dis'>Home</li>
      </ul>
      <button>sign in</button>
      
    </div>
  )
}

export default Navbar
