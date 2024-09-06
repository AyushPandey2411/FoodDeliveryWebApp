import mongoose from "mongoose"

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://ayushpandey24nov:6141530@cluster0.aidsqy5.mongodb.net/food-del').then(()=>console.log("DB connected"));
}