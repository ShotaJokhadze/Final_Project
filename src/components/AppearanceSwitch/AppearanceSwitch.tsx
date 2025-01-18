"use client";

import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export default function AppearanceSwitch(): JSX.Element {
  const t = useTranslations("Theme");
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleSelectTheme = (selectedTheme: string): void => {
    setTheme(selectedTheme);
    setDropdownOpen(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="p-2 cursor-pointer bg-mediumGray text-light rounded-md min-w-32 text-center">
        {t("selectMode")} {/* Use translation for the placeholder */}
      </div>
    );

    const themeIcon = () => {
      if (theme === "light") {
        return (
          <div>
            <FiSun className="text-lg"/>
          </div>
        );
      } else if (theme === "dark") {
        return (
          <div>
            <FiMoon className="text-lg"/>
          </div>
        );
      } else {
        return (
          <div>
            <FiMonitor className="text-lg"/>
          </div>
        );
      }
    };
    
  

  return (
    <div
      className="p-2 flex items-center relative cursor-pointer"
      tabIndex={0}
      onBlur={() => setDropdownOpen(false)}
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      <div className="bg-mediumGray text-light p-2 rounded-md text-center flex items-center gap-2">
        <span className="hidden lg:inline">{t("theme")}:</span>
        {themeIcon()}
      </div>

      {dropdownOpen && (
        <ul className="absolute top-full bg-mediumGray w-full text-light rounded-md">
          <li
            onClick={() => handleSelectTheme("light")}
            className="flex items-center gap-1 cursor-pointer p-2 hover:translate-x-1 transition-all"
          >
            <FiSun />
            <p>{t("light")}</p>
          </li>
          <li
            onClick={() => handleSelectTheme("dark")}
            className="flex items-center gap-1 cursor-pointer p-2 hover:translate-x-1 transition-all"
          >
            <FiMoon />
            <p>{t("dark")}</p>
          </li>
          <li
            onClick={() => handleSelectTheme("system")}
            className="flex items-center gap-1 cursor-pointer p-2 hover:translate-x-1 transition-all"
          >
            <FiMonitor />
            <p>{t("system")}</p>
          </li>
        </ul>
      )}
    </div>
  );
}
