import {Router} from "express";

const router = Router();
import jwt from "jsonwebtoken";
import { BadRequest } from "../constants/httpStatus.js";
import handler from "express-async-handler";
import {UserModel} from "../models/user.model.js";
import bcrypt from "bcrypt";
import auth from "../middleware/auth.mid.js";
const PASSWORD_HASH_SALT_ROUNDS = 10;

router.post("/register", handler(async (req, res) => {
    console.log("Register body:", req.body); // Log dữ liệu nhận được

    const { name, email, password, address } = req.body;

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        return res.status(BadRequest).send("Người dùng đã tồn tại");
    }

    const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS);

    const newUser = new UserModel({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        address,
        isAdmin: false
    });

    try {
        const savedUser = await newUser.save();
        res.send(generateToken(savedUser));
    } catch (err) {
        console.error("Save user error:", err); // Log lỗi chi tiết
        res.status(500).send("Lỗi server khi lưu user");
    }
}));
router.post("/login", handler(async(req, res) => {
    const {email, password} = req.body;
   const user = await UserModel.findOne({email});
   if(user){
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        res.status(BadRequest).send("Mật khẩu không chính xác");
    }
    const {token} = generateToken(user);
    res.send({
            id:user.id,
            email:user.email,
            name:user.name,
            address:user.address,
            isAdmin:user.isAdmin,
            token
        });
    }else{
        res.status(BadRequest).send("Đăng nhập thất bại");
    }
}))
router.put(
    "/updateProfile",
    auth,
    handler(async (req, res) => {
      const { name, address } = req.body;
      
      try {
        const user = await UserModel.findByIdAndUpdate(
          req.user.id,
          { name, address },
          { new: true }
        );
        
        if (!user) {
          return res.status(404).send("User not found");
        }
        
        res.send(generateToken(user)); // Make sure to use generateToken function
      } catch (err) {
        console.error("Update profile error:", err);
        res.status(500).send("Internal server error");
      }
    })
  );
  
  // Make sure this function exists (it was called generateTokenResponse in your code)
  const generateToken = (user) => {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
  
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token,
    };
  };
export default router;
