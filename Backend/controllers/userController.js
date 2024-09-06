import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"

//login user
const loginUser=async(req,res)=>{
   const{email,password}=req.body;
   try {
     const user=await userModel.findOne({email})

     if(!user)
     {
        return res.json({success:false,message:"User Doesn't exist"})
     }
     const isMatch=await bcrypt.compare(password,user.password);

     if(!isMatch)
     {
        return res.json({success:"false",message:"Invalid credentials"})
     }
     const token=createToken(user._id);
     res.json({success:true,token})

   } catch (error) {
    console.log(error);
    res.json({success:"false",message:"Error"})
   }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser=async(req,res)=>{
       const{name,password,email}=req.body;
       try {
        //checking is user already exists
          const exists=await userModel.findOne({email});
          if(exists)
          {
            return res.json({success:false,message:"User already exists"})
          }
          //Validation email format and strong password
          if(!validator.isEmail(email))
          {
            return res.json({success:false,message:"Please enter a valid email"})
          }
          if(password.length<8)
          {
            return res.json({success:false,message:"Please enter a strong password"})
          }
          //encrypting or hashing user password
          const salt=await bcrypt.genSalt(10);
          //instead of 5 we can write any num from 5-15
          
          const hashedPassword=await bcrypt.hash(password,salt);

          const newUser=new userModel(
            {
                name:name,
                email:email,
                password:hashedPassword
            }
          )
          //now new user is created ,we have to save new user in DB
          const user=await newUser.save()
          const token=createToken(user._id)
          res.json({success:true,token})
       } catch (error) {
              console.log(error)
              res.json({success:false,message:"Error"})
       }
}

//passing objects:oginuser,register user
export {loginUser,registerUser}