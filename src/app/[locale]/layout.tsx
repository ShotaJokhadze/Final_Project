import "../../globals.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "../../i18n/routing";
import { notFound } from "next/navigation";
import { CartProvider  } from "../Providers/Cart";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = params;

  if (!routing.locales.includes(locale as "en" | "ka")) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="page flex flex-col justify-between w-full min-h-screen bg-light text-darkGray dark:bg-darkGray dark:text-light">
      <CartProvider> 
        <Header />
              <div className="hero flex-1 flex">
                  <div className="hero-container min-h-full flex justify-center md:w-4/5 mx-auto max-w-screen-xl items-center">
                    {children}
                  </div>
              </div>
        <Footer />
      </CartProvider>
      </div>
    </NextIntlClientProvider>
  );
}
