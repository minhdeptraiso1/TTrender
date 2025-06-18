import { useState, createContext, useContext } from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";

const AuthContext = createContext(null);
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(userService.getUser());
    const login = async (email, password) => {
        try {
            const user = await userService.login(email, password);
            setUser(user);
            toast.success("Đăng nhập thành công");
        } catch (error) {
            toast.error("Đăng nhập thất bại");
        }
    }
    const updateProfile = async (userData) => {
        try {
          const response = await userService.updateProfile(userData);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
      
          return await response.json();
        } catch (err) {
          console.error("Update profile error:", err);
          throw err;
        }
      };
    const register = async data => {
        try {
            const user = await userService.register(data);
            setUser(user);
            toast.success("Đăng ký thành công");
        } catch (error) {
            toast.error("Đăng ký thất bại");
        }
    }
    const logout = () => {
        setUser(null);
        userService.logout();
        toast.success("Đăng xuất thành công");
    }
    return (
        <AuthContext.Provider value={{user, login, register, logout, updateProfile}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);