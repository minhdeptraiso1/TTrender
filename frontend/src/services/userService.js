import axios from "axios";

export const getUser = () =>
    localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
export const login = async (email, password) => {
    try {
        const {data} = await axios.post("/api/users/login", {email, password});
        localStorage.setItem("user", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        return null;
    }
}

export const register = async (data) => {
    const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
};
export const logout = () => {
    localStorage.removeItem("user");
}
export const updateProfile = async user => {
    const {data} = await axios.put("/api/users/updateProfile", user);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
}