import { connect, set } from "mongoose";
import dotenv from 'dotenv';
import { UserModel } from "../models/user.model.js";
import { FoodModel } from "../models/food.model.js";
import { sample_users, sample_foods } from "../data.js";
import bcrypt from "bcrypt";
// Load biến môi trường 
dotenv.config();
const PASSWORD_HASH_SALT_ROUNDS = 10;
set('strictQuery', true);

export const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI chưa được cấu hình trong file .env');
        process.exit(1);
    }

    try {
        await connect(process.env.MONGO_URI);
        console.log('MongoDB kết nối thành công');
        await seedUsers();
        await seedFoods();
    } catch (error) {
        console.error('Lỗi kết nối MongoDB:', error.message);
        process.exit(1);
    }
}; 
async function seedUsers(){
   const usersCount = await UserModel.countDocuments();
   if(usersCount > 0){
    console.log("Users đã tồn tại");
    return;
   }
   for(let user of sample_users){
    const hashedPassword = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    user.password = hashedPassword;
    await UserModel.create(user);
   }
   console.log("Users đã được thêm vào");
}

async function seedFoods(){
    const foodsCount = await FoodModel.countDocuments();
    if(foodsCount > 0){
        console.log("Foods đã tồn tại");
        return;
    }
    for(const food of sample_foods){
        food.image = `/food/${food.image}`;
        await FoodModel.create(food);
    }
    console.log("Foods đã được thêm vào");
}
