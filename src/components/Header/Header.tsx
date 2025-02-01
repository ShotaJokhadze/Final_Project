'use client'

import DesktopNav from "../DesktopNav/DesktopNav";
import MobileMenu from "../MobileNav/MobileNav";
import LanguageSwitcher from "../LanguageSwitch/LanguageSwitcher";
import AuthControls from "../AuthControls/AuthControl";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "../../i18n/routing";
import AppearanceSwitch from "../AppearanceSwitch/AppearanceSwitch";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../../app/Providers/Cart";

export default function Header(): JSX.Element {
  const t = useTranslations("Header");
  const locale = useLocale();
  const [session, setSession] = useState<boolean | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItemCount } = useCart();

  const navItems = [
    { href: "/products", label: t("products") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
    { href: "/blogs", label: t("blogs") },
  ];

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
      console.log("Logout failed:", data.message);
    } else {
      console.log("Logout successful:", data.message);
      window.location.href = `/${locale}/login`;
    }
  };

  if (session === false) {
    return (
      <nav
        id="topnav"
        className="bg-darkGray w-full sticky top-0 z-50 text-light dark:bg-light dark:text-darkGray py-1"
      >
        <div className="navbar-container relative flex w-[90%] sm:w-4/5 max-w-screen-xl justify-between mx-auto items-center">
          <div className="logo p-3">
            <Link className="w-full h-full block text-3xl" href="/">
              Home
            </Link>
          </div>

          {/* Right-side items for non-authenticated users */}
          <div className="flex items-center gap-3">
            <AuthControls
              session={session}
              locale={locale}
              handleLogout={handleLogout}
              t={t}
            />
            <AppearanceSwitch />
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      id="topnav"
      className="bg-darkGray w-full sticky top-0 z-50 text-light dark:bg-light dark:text-darkGray py-1"
    >
      <div className="navbar-container relative flex w-[90%] sm:w-4/5 max-w-screen-xl justify-between mx-auto items-center">
        <div className="logo p-3">
          <Link className="w-full h-full block text-3xl" href="/">
            Home
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:block">
          <DesktopNav navItems={navItems} />
        </div>

        {/* Right-side items */}
        <div className="flex items-center gap-3">
        <Link href="/cart" className="relative group">
          <ShoppingCart 
            size={30} 
            className="transition-transform group-hover:scale-11" 
          />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 
              bg-blue-600 text-white 
              dark:bg-blue-600 dark:text-white 
              rounded-full text-xs w-5 h-5 
              flex items-center justify-center 
              group-hover:animate-none 
              font-semibold shadow-md">
              {cartItemCount}
            </span>
          )}
        </Link>
          <AuthControls
            session={session}
            locale={locale}
            handleLogout={handleLogout}
            t={t}
          />
          <AppearanceSwitch />
          <LanguageSwitcher />
          <button
            className="xl:hidden p-2 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          setIsOpen={setIsMobileMenuOpen}
          navItems={navItems}
        />
      </div>
    </nav>
  );
}