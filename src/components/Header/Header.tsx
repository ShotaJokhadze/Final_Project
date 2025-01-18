"use client"

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Link } from '../../i18n/routing';
import AppearanceSwitch from '../AppearanceSwitch/AppearanceSwitch';
import GeoFlag from '../../assets/georgia.png';
import USFlag from '../../assets/united-states.png';
import { Menu, X } from 'lucide-react';
import Loader from "../Loader/Loader";

interface HeaderProps {}

export default function Header({}: HeaderProps): JSX.Element {
  const t = useTranslations("Header");
  const locale = useLocale();
  const [session, setSession] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const changeLanguage = (locale: string): void => {
    setIsOpen(false);
    router.push(`/${locale}${pathname.slice(3)}`);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await fetch(`/${locale}/api/auth/status`);
      const data = await response.json();
      setSession(data.authenticated);
    };

    checkAuthStatus();
  }, [locale]);

  const handleLogout = async () => {
    const response = await fetch(`/${locale}/api/auth/logout`, {
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('Logout failed. Error message:', data.message);
    } else {
      console.log('Logout successful:', data.message);
      window.location.href = `/${locale}/login`;
    }
  };

  const navItems = [
    { href: "/products", label: t("products") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
    { href: "/blogs", label: t("blog") },
    { href: "/profile", label: t("profile") }
  ];

  return (
    <nav id='topnav' className='bg-darkGray w-full sticky top-0 z-50 text-light dark:bg-light dark:text-darkGray py-1'>
      <div className="navbar-container relative flex w-4/5 max-w-screen-xl justify-between mx-auto items-center">
        <div className="logo p-3">
          <Link className='w-full h-full block text-3xl' href="/">Home</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:block">
          <ul className="navigation-menu flex gap-10 h-full">
            {navItems.map((item) => (
              <li key={item.href} className='relative flex items-center h-full'>
                <Link
                  className='block font-medium leading-6 transition-all hover:text-red'
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-3">
          {session === null ? (
            <div><Loader /></div>
          ) : !session ? (
            <a className="flex items-center" href={`/${locale}/login`}>
              <span className="bg-mediumGray text-light p-2 rounded-md min-w-20 text-center">Log in</span>
            </a>
          ) : (
            <a className="flex items-center">
              <button
                onClick={handleLogout}
                className="bg-mediumGray text-light p-2 rounded-md min-w-20 text-center"
              >
                Log out
              </button>
            </a>
          )}

          <AppearanceSwitch />

          <div className="flex items-center relative cursor-pointer bg-mediumGray rounded-md"
            tabIndex={0}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="text-light h-10 flex items-center text-center">
              {pathname.includes("/ka") ? (
                <li className="flex items-center cursor-pointer p-2 hover:-translate-y-0.5 transition-all justify-around gap-1">
                  <img src={GeoFlag.src} alt="" />
                  <span className="hidden sm:inline">ქარ</span>
                </li>
              ) : (
                <li className="flex items-center cursor-pointer p-2 hover:-translate-y-0.5 transition-all justify-around gap-1">
                  <img src={USFlag.src} alt="" />
                  <span className="hidden sm:inline">En</span>
                </li>
              )}
            </div>
            {isOpen && (
              <ul className="absolute top-[110%] left-0 bg-mediumGray w-full text-light rounded-md z-50">
                <li
                  onClick={() => changeLanguage("en")}
                  className="flex items-center cursor-pointer p-2 hover:-translate-y-0.5 transition-all justify-around gap-1"
                >
                  <img src={USFlag.src} alt="" />
                  <span className="hidden sm:inline">En</span>
                </li>
                <li
                  onClick={() => changeLanguage("ka")}
                  className="flex items-center cursor-pointer p-2 hover:-translate-y-0.5 transition-all justify-around gap-1"
                >
                  <img src={GeoFlag.src} alt="" />
                  <span className="hidden sm:inline">ქარ</span>
                </li>
              </ul>
            )}
          </div>

          {/* Mobile Menu Button - Moved to the end */}
          <button 
            className="xl:hidden p-2 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Overlay when mobile menu is open */}
        {isMobileMenuOpen && (
          <div 
            className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Navigation - Full height slide-in from left */}
        <div 
          className={`xl:hidden fixed top-0 left-0 w-64 h-screen bg-darkGray dark:bg-light transform transition-transform duration-300 ease-in-out z-50 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="pt-20 px-4">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className='block font-medium leading-6 transition-all hover:text-red py-2'
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}