import React from 'react'
import './Header.scss';

export default function Header() {
  return (
    <>
      <nav id='topnav'>
        <div className="navbar-container">
          <div className="logo">
            <a href="#">Logo</a>
          </div>
          <div className="navigation">
            <ul className="navigation-menu">
              <li className='active'>
                <a href="">Hero</a>
              </li>
              <li className='has-submenu'>
                <a href="">Listing
                  <i class="fa-solid fa-caret-down"></i>
                </a>
                <ul className="submenu">
                  <li>Tour Grid</li>
                  <li>Tour List</li>
                  <li>Tour Detail</li>
                </ul>
              </li>
              <li className='has-submenu'>
                <a href="">Pages
                  <i class="fa-solid fa-caret-down"></i>
                </a>
                <ul className="submenu">
                  <li>About Us</li>
                  <li>My Account</li>
                  <li>Help Center</li>
                </ul>
              </li>
              <li>
                <a href="">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
