import { createContext, useState } from "react";

export interface LoginContextType {
  loginUser: any | null;
  setLoginUser: React.Dispatch<React.SetStateAction<any | null>>;
}

export const LoginContext = createContext<LoginContextType>({
  loginUser: null,
  setLoginUser: () => {},
});

export const UserProvider = ({ children }: any) => {
  //FIXME: any
  const [loginUser, setLoginUser] = useState<any | null>(null);

  return (
    <LoginContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default UserProvider;
