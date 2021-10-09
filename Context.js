import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider({ children, data }) {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <Context.Provider
      value={{
        toggleTheme,
        darkTheme,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { ContextProvider, Context };
