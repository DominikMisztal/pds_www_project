import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";

type UserData = { name: string; surname: string; email: string };

type AuthContextType = {
  isLoading: boolean;
  isLoggedIn: boolean;
  isError: boolean;
  data?: UserData;
  error?: string;
};

const SessionContext = createContext<AuthContextType>({
  isLoading: true,
  isLoggedIn: false,
  isError: false,
});

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthContextType>({
    isLoading: true,
    isLoggedIn: false,
    isError: false,
  });

  const [cookies] = useCookies(["sessionId"]);

  useEffect(() => {
    if (!cookies.sessionId) {
      setAuthData({ isLoading: false, isLoggedIn: false, isError: false });
    } else {
      fetch("http://localhost:3001/auth/me", {
        method: "POST",
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("session expired");
          }
          return res.json();
        })
        .then((data: UserData) => {
          setAuthData({
            isLoading: false,
            isLoggedIn: true,
            isError: false,
            data: data,
          });
        })
        .catch((err: { message: string }) => {
          setAuthData({
            isLoading: false,
            isLoggedIn: false,
            isError: true,
            error: err.message,
          });
        });
    }
  }, [cookies]);

  return (
    <SessionContext.Provider value={authData}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

export default SessionProvider;
