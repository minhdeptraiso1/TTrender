import {model, Schema} from "mongoose";
export const FoodSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    tags: {type: [String], required: true},
    stars: {type: Number, default: 3},
    origins: {type: [String], required: true},
    cookTime: {type: String, required: true},
    favorite: {type: Boolean, required: true}
    
},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
export const FoodModel = model("Food", FoodSchema);
