import { createContext, useContext, useState, useEffect } from "react";
import { checkisIsAuthenticated } from "../_Services/authService";

const IsAuthenticatedContext = createContext();

export const useIsAuthenticated = () => useContext(IsAuthenticatedContext);

export const IsAuthenticatedProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const res = await checkisIsAuthenticated();
      if (res) {
        setIsAuthenticated(true);
        setLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <html lang="en">
        <body>
          <main id="loading-main">
            <div className="loader"></div>
          </main>
        </body>
      </html>
    );
  }

  return (
    <IsAuthenticatedContext.Provider value={isAuthenticated}>
      {children}
    </IsAuthenticatedContext.Provider>
  );
};
