import React, { useContext, useEffect, useState } from 'react';

/**
 * Context object for the custom hook.
 * @type {React.Context<{ name: string, saveName: Function }>}
 */
const MyContext = React.createContext();

/**
 * Custom hook for managing a name state with localStorage persistence.
 * @param {string} initName - Initial name value.
 * @returns {{ name: string, saveName: Function }} Object containing name state and saveName function.
 */
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

/**
 * Provider component that wraps the app and provides the custom hook's functionality.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @param {string} props.name - Initial name value.
 * @returns {JSX.Element} JSX element representing the provider.
 */
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
