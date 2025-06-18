import express from "express";
import {FoodModel} from "../models/food.model.js";
import handler from "express-async-handler";

const router = express.Router()

router.get("/", handler(async(req, res) => {
    const foods = await FoodModel.find();
    res.send(foods)
}))

router.get("/tags", handler(async(req, res) => {
    const tags = await FoodModel.aggregate([
        {
            $unwind: "$tags"
        },
        {
            $group: {
                _id: "$tags",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                name: "$_id",
                count: '$count'
            }
        }
    ]).sort({count: -1});
    const allTags = {
        name: "Tất cả",
        count: await FoodModel.countDocuments()
    }
    tags.unshift(allTags);
    res.send(tags)
}))
router.get("/search/:searchTerm", handler(async(req, res) => {
    const {searchTerm} = req.params;
    const searchTermRegex = new RegExp(searchTerm, "i");
    const foods = await FoodModel.find({
        name: { $regex: searchTermRegex }
    });
    res.send(foods);
}))
router.get("/tag/:tagName", handler(async(req, res) => {
    const {tagName} = req.params;
    const foods = await FoodModel.find({
        tags: { $in: [tagName] }
    });
    res.send(foods);
}))
router.get("/:id", handler(async(req, res) => {
    const {id} = req.params;
    const food = await FoodModel.findById(id);
    res.send(food);
}))
export default router;