import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [userId, setUserId] = useState(null); 
  
  return (
    <UserContext.Provider value={{ user, setUser, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
