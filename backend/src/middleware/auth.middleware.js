import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt; //jwt in utils, cookie

        if(!token){
            return res.status(401).json({ message: "Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message: "Unauthorized - invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password"); //does not return password to user

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user

        next(); //if user is authorised then the next function which is updateProfile will be called

    } catch (error) {
        console.log("Error in protectionRoute middleware: ",error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

//cookie-parser - grab token from cookies