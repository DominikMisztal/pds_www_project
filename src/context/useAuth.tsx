import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";

type AuthContextType = {
  isLoading: boolean;
  isLoggedIn: boolean;
  //TODO: unkown is temporary, idk the data shape yet
  data?: unknown;
};

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isLoggedIn: false,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthContextType>({
    isLoading: true,
    isLoggedIn: false,
  });

  const [cookies] = useCookies(["user_id"]);

  useEffect(() => {
    if (!cookies.user_id) {
      setAuthData({ isLoading: false, isLoggedIn: false });
    } else {
      setAuthData({
        isLoading: false,
        isLoggedIn: true,
        data: cookies.user_id,
      });
    }
  }, [cookies]);

  return (
    <AuthContext.Provider value={authData}> {children} </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
