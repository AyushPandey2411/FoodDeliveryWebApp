import jwt from "jsonwebtoken"

const authMiddleware=async(req,res,next)=>{
    const{token}=req.headers;
      //token not available
      if(!token)
      {
        return res.json({success:false,message:"Not Authorised Login Again"})
      }
      //have token
      try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        //calling callback function
        next();
      } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
      }

}

export default authMiddleware