import './Header.scss';
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <>
      <nav id='topnav'>
        <div className="navbar-container">
          <div className="logo">
            <NavLink to="/">Logo</NavLink>
          </div>
          <div className="navigation">
            <ul className="navigation-menu">
              <li >
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact Us</NavLink>
              </li>
              <li>
                <NavLink to="/assignment3">Assignment 3</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
