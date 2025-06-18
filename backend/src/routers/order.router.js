import { Router } from "express";
import auth from "../middleware/auth.mid.js";
import handler from "express-async-handler";
import { OrderModel } from "../models/order.model.js";
import { FoodModel } from "../models/food.model.js";
import { OrderStatus } from "../constants/orderStatus.js";
import { BadRequest } from "../constants/httpStatus.js";

const router = Router();
router.use(auth);

router.post("/create", handler(async (req, res) => {
    const { foodIds, name, address, addressLatLng, paymentMethod } = req.body;

    if (!foodIds || !Array.isArray(foodIds) || foodIds.length === 0) {
        return res.status(BadRequest).send("Không có món ăn nào được chọn");
    }

    if (!name || !address || !addressLatLng || !paymentMethod) {
        return res.status(BadRequest).send("Thiếu thông tin người nhận, địa chỉ hoặc phương thức thanh toán");
    }

    const foods = await FoodModel.find({ _id: { $in: foodIds } });

    if (foods.length !== foodIds.length) {
        return res.status(BadRequest).send("Một số món ăn không tồn tại");
    }

    const orderItems = foods.map(food => ({
        food,
        quantity: 1,
        price: food.price
    }));

    const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0);

    const newOrder = new OrderModel({
        items: orderItems,
        user: req.user.id,
        name,
        address,
        addressLatLng,
        totalPrice,
        status: OrderStatus.NEW,
        paymentMethod, // ✅ thêm dòng này
        deliveryStatus: 'Đang xử lý' // ✅ nếu bạn muốn thêm trạng thái vận chuyển
    });

    await newOrder.save();
    res.send(newOrder);
}));



router.post("/ship", handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
        return res.status(BadRequest).send("Không có đơn hàng");
    }
    order.status = OrderStatus.MOVING;
    await order.save();
    res.send(order);
}));

router.get("/newOrderForCurrentUser", handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(BadRequest).send("Không có đơn hàng");
}));

const getNewOrderForCurrentUser = async req =>
    await OrderModel.findOne({
        user: req.user.id,
        status: OrderStatus.MOVING,
    });

export default router;