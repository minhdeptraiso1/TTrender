import axios from "axios";
//lấy tất cả món ăn
export const getAll = async() =>{
    try {
        const response = await axios.get("/api/foods");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return [];
    }
}
//tim kiếm món ăn
export const search = async searchTerm =>{
    try {
        const response = await axios.get(`/api/foods/search/${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        return [];
    }
}
//lấy tất cả tag
export const getAllTags = async() =>{
    try {
        const response = await axios.get("/api/foods/tags");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy tag:", error);
        return [];
    }
}
//lấy tag theo tên
export const getTagByName = async tagName =>{
    if(tagName === "Tất cả") return getAll();
    try {
        const response = await axios.get(`/api/foods/tag/${tagName}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy tag theo tên:", error);
        return [];
    }
}
//lấy món ăn theo id
export const getFoodById = async foodId =>{
    try {
        const response = await axios.get(`/api/foods/${foodId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy món ăn:", error);
        return null;
    }
}

