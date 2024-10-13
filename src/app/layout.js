import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export const metadata = {
  title: "Next App",
  description: "My App is on a Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <div className="page">
            <Header />
            <div className="hero">
              <div className="hero-container">{children}</div>
            </div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
