'use client'
import { Link } from "../../i18n/routing";
import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/blogs', label: 'Blogs' }
  ];

  const socialLinks = [
    { href: 'https://twitter.com', icon: Twitter },
    { href: 'https://linkedin.com', icon: Linkedin },
    { href: 'https://github.com', icon: Github }
  ];

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 w-full">
      <div className="w-4/5 max-w-screen-xl mx-auto py-6">
        {/* Main Navigation */}
        <div className="flex flex-col items-center space-y-6">
          <ul className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-blue-600 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <ul className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              </li>
            ))}
          </ul>

          {/* Copyright */}
          <p className="text-sm text-center">
            © {currentYear} Shota Jokhadze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;