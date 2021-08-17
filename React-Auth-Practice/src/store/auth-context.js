import React, { useState,useEffect,useCallback } from "react";
let logoutTimer;
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustedTime = new Date(expirationTime).getTime();
  const remainingTime = adjustedTime - currentTime;
  return remainingTime;
};
const retrieveToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpirationTime);
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveToken();
  let initialToken;
  if (tokenData) {
    initialToken = localStorage.getItem("token");
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem('expirationTime')
  },[])

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
      if(tokenData) {
        logoutTimer = setTimeout(logoutHandler, tokenData.duration);
      }
  },[tokenData,logoutHandler])

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
