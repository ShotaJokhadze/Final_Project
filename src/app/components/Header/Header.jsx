'use client'

import AppearanceSwitch from '../AppearanceSwitch/AppearanceSwitch';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Link } from '../../../i18n/routing'
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from 'react';


export default function Header() {
  const t = useTranslations("Header")

  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState()

  const changeLanguage = (locale) => {
    setIsOpen(false);
    router.push(`/${locale}${pathname.slice(3)}`);
  }

  const { user } = useUser();

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
                {t("products")}
              </Link>
            </li>
            <li className='relative flex items-center h-full'>
              <Link
                className='block font-medium leading-6 transition-all hover:text-red'
                href="/about">{t("about")}</Link>
            </li>
            <li className='relative flex items-center h-full'>
              <Link
                className='block font-medium leading-6 transition-all hover:text-red'
                href="/contact">{t("contact")}</Link>
            </li>
            <li className='relative flex items-center h-full'>
              <Link
                className='block font-medium leading-6 transition-all hover:text-red'
                href="/assignment3">Assignment 3</Link>
            </li>
            <li className='relative flex items-center h-full'>
              <Link
                className='block font-medium leading-6 transition-all hover:text-red'
                href='/blogs'>{t("blog")}</Link>
            </li>
            <li className='relative flex items-center h-full'>
              <Link
                className='block font-medium leading-6 transition-all hover:text-red'
                href='/profile'>{t("profile")}</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-1">
          {user ? <div className='flex items-center gap-2'>
            <Link href="/profile">
              <img className='w-10 rounded-full' src={user.picture} alt="" />
            </Link>
            <a
              className='bg-mediumGray text-light p-2 rounded-md min-w-20 text-center'
              href='/api/auth/logout'>{t("logout")}
            </a>
          </div>

            : <a href="/api/auth/login"
              className='bg-mediumGray text-light p-2 rounded-md min-w-20 text-center'>
              {t("login")}
            </a>}

          <AppearanceSwitch />
          <div className="p-2 flex items-center relative cursor-pointer"
            tabIndex={0}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className="bg-mediumGray text-light p-2 rounded-md h-10 flex items-center text-center"
            >
              {pathname.includes("/ka") ? "ქარ" : "En"}
            </div>
            {isOpen && (
              <ul className="absolute top-full bg-mediumGray w-full text-light rounded-md p-1">
                <li
                  onClick={() => changeLanguage("en")}
                  className="flex items-center gap-1 cursor-pointer p-2 hover:-translate-y-0.5 transition-all justify-center"
                >
                  En
                </li>
                <li
                  onClick={() => changeLanguage("ka")}
                  className="flex items-center gap-1 cursor-pointer p-2 hover:-translate-y-0.5 transition-all justify-center"
                >
                  ქარ
                </li>
              </ul>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}
