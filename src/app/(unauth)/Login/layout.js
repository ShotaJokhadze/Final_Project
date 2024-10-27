"use client";
import "../../globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkisIsAuthenticated } from "../../Services/authService";

export default function NotAuthLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getAuthStatus() {
      const res = await checkisIsAuthenticated();
      setIsAuthenticated(res);
    }
    getAuthStatus();
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="root">
          <div className="application">
            {!isAuthenticated ? children : router.push("/")}
          </div>
        </div>
      </body>
    </html>
  );
}
