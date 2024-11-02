import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Appearance } from "./Providers/Appearance";

export const metadata = {
  title: "Next App",
  description: "My App is on a Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Appearance>
          <div className="page bg-light text-darkGray dark:bg-darkGray dark:text-light">
            <Header />
            <div className="hero">
              <div className="hero-container">{children}</div>
            </div>
            <Footer />
          </div>
        </Appearance>
      </body>
    </html>
  );
}
