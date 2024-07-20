import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    !!localStorage.getItem("breadToken")
  );
  const [jwt, setJwt] = useState(localStorage.getItem("breadToken"));

  return (
    <AuthContext.Provider value={{ jwt, setJwt, authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
