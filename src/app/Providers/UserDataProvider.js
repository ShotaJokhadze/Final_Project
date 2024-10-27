import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentAuthUser } from "../_Services/authService";

const UserDataContext = createContext();

export const useUserDataContext = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getCurrentAuthUser();
      setUserData(data);
      setLoading(false);
    };
    fetchUserData();
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
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};
