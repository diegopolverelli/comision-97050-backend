import mongoose from "mongoose";

export const productsModel=mongoose.model(
    "products",
    new mongoose.Schema(
        {
            title: String, 
            code: {
                type: String, 
                unique: true
            },
            price: Number, 
            stock: Number
        },
        {
            // collection: "productos2024_01",
            timestamps: true, 
            strict: false
        }
    )
)