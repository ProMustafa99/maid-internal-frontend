// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import Toast from "../components/common/Toast";
// import { RegisterCredentials } from "../interface/register";
// import {
//   checkAuthApi,
//   loginApi,
//   logoutApi,
//   registerApi,
// } from "../lib/api/auth";
// import { useLanguage } from "./language-context";

// interface User {
//   id: string;
//   email: string;
//   name?: string;
//   display_name?: string;
//   role_id: number;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   emptyUser: () => void;
//   isLoading: boolean;
//   loginError: string | null;
//   register: (data: any, close: () => void) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loginError, setLoginError] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { rerender } = useLanguage();
  
//   useEffect(() => {
//     checkAuth();
//   }, [rerender]);

//   const checkAuth = async () => {
//     setIsLoading(true);
//     try {
//       const response = await checkAuthApi();
//       if (response) {
//         setUser(response.data);
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.error("Current user fetch failed:");
//       setUser(null);
//     } finally {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 300);
//     }
//   };

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await loginApi({ email, password, tenant_id: 1 });
//       const userData = response.data;
//       setUser(userData);
//     } catch (error) {
//       if (error instanceof Error) {
//         setLoginError(error.message);
//         throw error;
//       }
//       throw new Error("Login failed");
//     }
//   };

//   const emptyUser = () => {
//     setUser(null);
//   };

//   const logout = async () => {
//     try {
//       await logoutApi();
//       setUser(null);
//       window.open("/login", "_self");
//     } catch (error) {
//       console.error("Logout error:", error);
//       throw error;
//     }
//   };

//   const register = async (data: RegisterCredentials, close: () => void) => {
//     try {
//       await registerApi(data);

//       Toast({ message: "Registration successful", type: "success" });
//       close();
//     } catch (error: any) {
//       console.error("Registration failed:", error);
//       Toast({
//         message: error.response?.data?.message || "Registration failed",
//         type: "error",
//       });
//       throw error;
//     }
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     emptyUser,
//     loginError,
//     register,
//     isLoading,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
