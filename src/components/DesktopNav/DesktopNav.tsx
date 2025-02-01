import { Link } from "../../i18n/routing";

interface NavigationMenuProps {
  navItems: { href: string; label: string }[];
}

export default function NavigationMenu({ navItems }: NavigationMenuProps): JSX.Element {
  return (
    <ul className="navigation-menu flex gap-10 h-full">
      {navItems.map((item) => (
        <li key={item.href} className="relative flex items-center h-full">
          <Link
            className="block font-medium leading-6 transition-all hover:text-blue-600"
            href={item.href}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
