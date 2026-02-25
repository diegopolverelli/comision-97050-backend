import mongoose from "mongoose";

export const usersModel=mongoose.model(
    "usuarios", 
    new mongoose.Schema(
        {
            nombre: String, 
            email:{
                type: String, 
                unique: true
            }
        },
        {
            timestamps: true
        }
    )
)