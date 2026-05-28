/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

//mise sur pieds du contexte
const UserContext = createContext();

// 2. le Provider
export  function UserProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [bestScore, setBestScore] = useState(0);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        bestScore,
        setBestScore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// 3. Custom hook pour simplifier l'accès
export function useUser() {
  return useContext(UserContext);
}