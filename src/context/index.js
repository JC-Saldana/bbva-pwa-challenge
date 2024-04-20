import React, { useContext, useEffect, useState } from 'react';

const MyContext = React.createContext();

const useMyHookEffect = (initName) => {
  const [name, setName] = useState(initName);
  const saveName = (name) => {
    window.localStorage.setItem('name', name);
    setName(name);
  };

  useEffect(() => {
    const myName = window.localStorage.getItem('name');
    setName(myName);
  }, []);

  return { name, saveName };
};

// Provider component that wraps app and makes themeMode object
export function MyHookProvider({ children, name }) {
  const myEffect = useMyHookEffect(name);
  return (
    <MyContext.Provider value={myEffect}>
        {children}
    </MyContext.Provider>
  );
}

export const useMyHook = () => useContext(MyContext);
