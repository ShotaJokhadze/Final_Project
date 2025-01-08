import "../globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Appearance } from "../Providers/Appearance";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "../../i18n/routing";
import { notFound } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

type Locale = "en" | "ka";  // Define the allowed locales as a union type

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;  // Type locale as 'en' or 'ka'
  };
}

export const metadata = {
  title: "Next App",
  description: "My App is on a Next.js",
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  const session = await getSession();

  if (!session?.user) {
    redirect("/api/auth/login");
  }

  if (session?.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {session.error.message}
        </div>
      </div>
    );
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <UserProvider>
          <NextIntlClientProvider messages={messages}>
            <Appearance>
              <div className="page flex flex-col justify-between w-full min-h-screen bg-light text-darkGray dark:bg-darkGray dark:text-light">
                <Header />
                <div className="hero flex-1 flex">
                  <div className="hero-container min-h-full flex justify-center w-4/5 mx-auto max-w-screen-xl items-center">
                    {children}
                  </div>
                </div>
                <Footer />
              </div>
            </Appearance>
          </NextIntlClientProvider>
        </UserProvider>
      </body>
    </html>
  );
}
