import { createContext, useState } from "react";
import { RegisterFormInputs } from "../Register";

export interface LoginContextType {
  loginUser: RegisterFormInputs | null;
  setLoginUser: (value: RegisterFormInputs | null) => void;
}

export const LoginContext = createContext<LoginContextType>({
  loginUser: null,
  setLoginUser: (value: object | null): void => {
    throw new Error("Function not implemented.");
  },
});

export const UserProvider = ({ children }: any) => {
  //FIXME: any
  const [loginUser, setLoginUser] = useState<RegisterFormInputs | null>(null);

  return (
    <LoginContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default UserProvider;
