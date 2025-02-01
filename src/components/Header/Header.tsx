'use client';

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
    { href: "/profile", label: t("profile") },
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
    const response = await fetch(`/${locale}/api/auth/logout`, { method: "POST" });
    const data = await response.json();

    if (!response.ok) {
      console.error("Logout failed:", data.message);
    } else {
      console.log("Logout successful:", data.message);
      window.location.href = `/${locale}/login`;
    }
  };

  return (
    <nav className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8 h-16">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl sm:text-3xl font-bold tracking-wide hover:text-blue-400 dark:hover:text-blue-600 transition-colors"
        >
          Home
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex space-x-8">
          <DesktopNav navItems={navItems} />
        </div>

        {/* Right-side controls */}
        <div className="flex items-center gap-6">
          {/* Shopping Cart */}
          <Link 
            href="/cart" 
            className="relative group hover:text-blue-400 dark:hover:text-blue-600 transition-colors"
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white dark:bg-blue-600 dark:text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold shadow-md">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Authentication Controls */}
          <div className="hidden sm:block">
            <AuthControls 
              session={session} 
              locale={locale} 
              handleLogout={handleLogout} 
              t={t} 
            />
          </div>

          {/* Theme & Language Switchers */}
          <div className="flex items-center gap-4">
            <AppearanceSwitch />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 rounded-lg hover:bg-mediumGray hover:text-light dark:hover:bg-mediumGray transition-all focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 
              <X size={24} /> : 
              <Menu size={24} />
            }
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setIsMobileMenuOpen} 
        navItems={navItems} 
      />
    </nav>
  );
}