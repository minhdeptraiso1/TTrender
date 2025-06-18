import {Schema, model} from "mongoose";
import {OrderStatus} from "../constants/orderStatus.js";
import {FoodModel} from "../models/food.model.js";
import {UserModel} from "../models/user.model.js";
export const LatLngSchema = new Schema({
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
},{
    _id: false
});
export const OrderItemSchema = new Schema({
    food: {type: FoodModel.schema, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true}
},{
    _id: false,
});
OrderItemSchema.pre("validate", function (next) {
    this.price = this.food.price * this.quantity;
    next();
});
const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    name: {type: String, required: true},
    items: {type: [OrderItemSchema], required: true},
    totalPrice: {type: Number, required: true},  
    address: {type: String, required: true},
    addressLatLng:{ type: LatLngSchema, required: true},
    status: {
    type: String,
    enum: ["pending", "confirmed", "delivered"], // <-- enum ở đây
    default: "pending"
  },
    paymentMethod: {
        type: String,
        enum: ['COD', 'VNPAY', 'MOMO'], // hoặc các phương thức khác bạn hỗ trợ
        required: true
    }
},{
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
export const OrderModel = model("order", OrderSchema);