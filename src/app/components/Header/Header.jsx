'use client'

import './Header.scss';
import Link from 'next/link';
import userImg from '../../public/images/user.jpg'
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
          <Link href="/">Logo</Link>
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
              <img src={userImg.src} alt="User" />
              <ul className={`user-submenu ${isOpen ? 'open' : ''}`}>
                <li><Link href='/profile'>Profile</Link></li>
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
