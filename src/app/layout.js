import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Appearance } from "./Providers/Appearance";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "Next App",
  description: "My App is on a Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserProvider>
          <Appearance>
            <div className="page flex flex-col justify-between w-full min-h-screen bg-light text-darkGray dark:bg-darkGray dark:text-light">
              <Header />
              <div className="hero flex-1 flex">
                <div className="hero-container min-h-full flex justify-center w-4/5 mx-auto max-w-screen-xl">
                  {children}
                </div>
              </div>
              <Footer />
            </div>
          </Appearance>
        </UserProvider>
      </body>
    </html>
  );
}
