import './Header.scss';
import { NavLink } from 'react-router-dom';
import userImg from '../../assets/user.jpg';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <nav id='topnav'>
      <div className="navbar-container">
        <div className="logo">
          <NavLink to="/">Logo</NavLink>
        </div>
        <div className="navigation">
          <ul className="navigation-menu">
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/assignment3">Assignment 3</NavLink>
            </li>
            <li>
              <NavLink to='/blogs'>Blogs</NavLink>
            </li>
          </ul>
        </div>
        <div className="profile">
          <div className="user-container">
            <div
              className="user"
              tabIndex={0}
              onClick={handleClick}
              onBlur={handleBlur}
            >
              <img src={userImg} alt="User" />
              <ul className={`user-submenu ${isOpen ? 'open' : ''}`}>
                <li><NavLink to='/profile'>Profile</NavLink></li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
