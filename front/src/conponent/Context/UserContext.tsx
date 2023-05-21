import { createContext, useState } from "react";

export interface LoginContextType {
  loginUser: loginUser | undefined;
  setLoginUser: React.Dispatch<React.SetStateAction<loginUser | undefined>>;
}

export interface loginUser {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export const LoginContext = createContext<LoginContextType>({
  loginUser: undefined,
  setLoginUser: () => {},
});

//FIXME: any
export const UserProvider = ({ children }: any) => {
  const [loginUser, setLoginUser] = useState<loginUser | undefined>(undefined);

  return (
    <LoginContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default UserProvider;
