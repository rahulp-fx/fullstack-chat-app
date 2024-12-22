import jwt from "jsonwebtoken"

export const generateToken= (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d",
    })  //generating token

    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,  //7 days in millisecond
        httpOnly: true, //prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })  //sending jwt token in cookie, specifically http only cookie

    return token;
}