'use client'

import './Header.scss';
import Link from 'next/link';
import AppearanceSwitch from '../AppearanceSwitch/AppearanceSwitch';

export default function Header() {

  function handleLogout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    window.location.href = "/Login";
  }

  return (
    <nav id='topnav'>
      <div className="navbar-container">
        <div className="logo">
          <Link href="/">Home</Link>
        </div>
        <div className="navigation">
          <ul className="navigation-menu">
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/assignment3">Assignment 3</Link>
            </li>
            <li>
              <Link href='/blogs'>Blogs</Link>
            </li>
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          </ul>
        </div>
        <div className="logout">
          <button onClick={handleLogout}>logout</button>
        </div>
        <AppearanceSwitch />
      </div>
    </nav>
  );
}
