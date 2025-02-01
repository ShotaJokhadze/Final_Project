import { Link } from "../../i18n/routing";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  navItems: { href: string; label: string }[];
}

export default function MobileMenu({ isOpen, setIsOpen, navItems }: MobileMenuProps): JSX.Element {
  return (
    <>
      {/* Overlay when mobile menu is open */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      <div
        className={`xl:hidden fixed top-0 left-0 w-64 h-screen bg-zinc-100 dark:bg-zinc-900 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-20 px-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="block font-medium leading-6 transition-all hover:text-blue-600 py-2"
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
