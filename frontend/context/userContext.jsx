import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [interestedIn, setInterestedIn] = useState([]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        skills,
        setSkills,
        interestedIn,
        setInterestedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) return alert("Not a child of the user context");
  return context;
};
