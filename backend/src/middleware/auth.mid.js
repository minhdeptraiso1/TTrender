import jwt from "jsonwebtoken";
import { Unauthorized } from "../constants/httpStatus.js";

export default (req, res, next) => {
    const token = req.headers.access_token;
    if (!token) {
        return res.status(Unauthorized).send("Đăng nhập thất bại");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(Unauthorized).send("Token không hợp lệ");
    }
};
