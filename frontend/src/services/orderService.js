import axios from "axios";

export const createOrder = async (order) => {
    try {
        const {data} = await axios.post("/api/orders/create", order);
        return data;
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        return null;
    }
}

export const getNewOrderForCurrentUser = async () => {
    try {
        const {data} = await axios.get("/api/orders/newOrderForCurrentUser");
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
        return null;
    }
}

export const payOrder = async () => {
    try {
        const {data} = await axios.put("/api/orders/ship");
        return data;
    } catch (error) {
        console.error("Lỗi khi thanh toán đơn hàng:", error);
        return null;
    }
}
