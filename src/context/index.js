import React, { useContext, useEffect, useState } from 'react';

const MyContext = React.createContext();

const useMyHookEffect = (initName) => {
  /**
   * State for the name.
   * @type {[string, Function]}
   */
  const [name, setName] = useState(initName);

  /**
   * Function to save the name to localStorage.
   * @param {string} name - The name to save.
   */
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

export function MyHookProvider({ children, name }) {
  /**
   * Custom hook effect result.
   * @type {{ name: string, saveName: Function }}
   */
  const myEffect = useMyHookEffect(name);

  return (
    <MyContext.Provider value={myEffect}>
      {children}
    </MyContext.Provider>
  );
}

/**
 * Custom hook for accessing the context provided by MyHookProvider.
 * @returns {{ name: string, saveName: Function }} Object containing name state and saveName function.
 */
export const useMyHook = () => useContext(MyContext);
