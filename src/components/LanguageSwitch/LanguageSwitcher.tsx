import { useState } from "react";
import { useLocale} from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import GeoFlag from "../../assets/georgia.png";
import USFlag from "../../assets/united-states.png";

export default function LanguageSwitcher(): JSX.Element {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (newLocale: string): void => {
    setIsOpen(false);
    router.push(`/${newLocale}${pathname.slice(3)}`);
  };

  return (
    <div
      className="flex items-center relative cursor-pointer bg-mediumGray rounded-md"
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="text-light h-10 flex items-center text-center">
        {pathname.includes("/ka") ? (
          <li className="flex items-center cursor-pointer p-2 hover:-translate-y-0.5 transition-all justify-around gap-1">
            <img src={GeoFlag.src} alt="Georgian Flag" />
            <span className="hidden sm:inline">ქარ</span>
          </li>
        ) : (
          <li className="flex items-center cursor-pointer p-2 hover:-translate-y-0.5 transition-all justify-around gap-1">
            <img src={USFlag.src} alt="US Flag" />
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
            <img src={USFlag.src} alt="US Flag" />
            <span className="hidden sm:inline">En</span>
          </li>
          <li
            onClick={() => changeLanguage("ka")}
            className="flex items-center cursor-pointer p-2 hover:-translate-y-0.5 transition-all justify-around gap-1"
          >
            <img src={GeoFlag.src} alt="Georgian Flag" />
            <span className="hidden sm:inline">ქარ</span>
          </li>
        </ul>
      )}
    </div>
  );
}
