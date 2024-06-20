import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;

export const ContextState = () => {
  return useContext(MyContext);
};
