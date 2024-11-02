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
    <nav id='topnav' className='bg-darkGray w-full z-50 relative text-light dark:bg-light dark:text-darkGray py-1'>
      <div className="navbar-container relative flex w-4/5 max-w-screen-xl justify-between mx-auto">
        <div className="logo p-3">
          <Link className='w-full h-full block text-3xl' href="/">Home</Link>
        </div>
        <div className="navigation">
          <ul className="navigation-menu flex gap-10 h-full">
            <li className='relative flex items-center h-full'>
              <Link
                className='block font-medium leading-6 transition-all hover:text-red' href="/products">
                Products
              </Link>
            </li>
            <li className='relative flex items-center h-full'>
              <Link
                className='block font-medium leading-6 transition-all hover:text-red'
                href="/about">About</Link>
            </li>
            <li className='relative flex items-center h-full'>
              <Link
                className='block font-medium leading-6 transition-all hover:text-red'
                href="/contact">Contact Us</Link>
            </li>
            <li className='relative flex items-center h-full'>
              <Link
                className='block font-medium leading-6 transition-all hover:text-red'
                href="/assignment3">Assignment 3</Link>
            </li>
            <li className='relative flex items-center h-full'>
              <Link
                className='block font-medium leading-6 transition-all hover:text-red'
                href='/blogs'>Blogs</Link>
            </li>
            <li className='relative flex items-center h-full'>
              <Link
                className='block font-medium leading-6 transition-all hover:text-red'
                href='/profile'>Profile</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <button className='bg-mediumGray text-light p-2 rounded-md min-w-20 text-center hover:border-light hover:border transition-all' onClick={handleLogout}>logout</button>
          <AppearanceSwitch />
        </div>

      </div>
    </nav>
  );
}
