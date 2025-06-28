import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-logo">Books Read</span>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/novo">New Book</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
