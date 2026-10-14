import BusinessLogin from "../models/businessLogin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import sessionModel from "../models/session.js";


// =========================
// REGISTER
// =========================

export const registerBusiness=async(req,res)=>{
 try{
    const {username,businessName,email,mobile,password}=req.body;
    if(!username || !businessName || !email || !mobile || !password){
        return res.status(400).json({
            error:"All fields are required"
        })
    }

        const isAlredyExist = await BusinessLogin.findOne({ email: email.toLowerCase().trim() });
        if(isAlredyExist){
            return res.status(400).json({
                error:"Email is alredy registered"
            })
        }
    

        const hashPassword=await bcrypt.hash(password,10);
        const businessLogin=new BusinessLogin({
            username,
            businessName,
            email,
            mobile,
           password:hashPassword
        })
        await businessLogin.save();

        //Access Token

      const accessToken= jwt.sign(
        {
            businessLoginId:businessLogin._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"15m"
        }
      )

      //Refresh token

      const refreshToken=jwt.sign(
        {
            businessLoginId:businessLogin._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
      )

      //Hash refreshToken

      const refreshTokenHash=crypto.createHash("sha256").update(refreshToken).digest("hex");

      //save sessions
      await sessionModel.create({
        businessLogin:businessLogin._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]

      });

      //cookies

      res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:false,         //localhost
        sameSite: "lax",
         maxAge: 7 * 24 * 60 * 60 * 1000
      });

       return res.status(201).json({
            message: "User registered successfully",
            businessLogin: {
                username: businessLogin.username,
                businessName:businessLogin.businessName,
                mobile:businessLogin.mobile,
                email: businessLogin.email
            },
            accessToken
        });

 }catch(error){
    console.log(error);
    return res.status(500).json({
        error :"Internal server error"
    })
 }
}


// =========================
// LOGIN
// =========================

export const loginToBusiness=async(req,res)=>{
try{
   const{email,password}=req.body

   if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }
 
         // Find user
        const businessLogin = await BusinessLogin.findOne({ email }).select("+password");

        if (!businessLogin) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        //Compare password

        const isPasswordCorrect=await bcrypt.compare(
          password,businessLogin.password
        )

        if(!isPasswordCorrect){
            return res.status(401).json({
                error:"Invalid email and password"
            })
        }
   // Access token
        const accessToken = jwt.sign(
            {
                businessLoginId: businessLogin._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        // Refresh token
        const refreshToken = jwt.sign(
            {
                businessLoginId: businessLogin._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );
        

        // Hash refresh token
        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        // Save session
        await sessionModel.create({
            businessLogin: businessLogin._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        });

        // Store refresh token in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // localhost
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            businessLogin: {
                username: businessLogin.username,
                businessName:businessLogin.businessName,
                mobile:businessLogin.mobile,
                email: businessLogin.email
            },
            accessToken
        });


}catch(error){
 console.log(error);
 return res.status(500).json({
    error:"Internal server error"
 })
}
}


// =========================
// REFRESH TOKEN
// =========================

export const refreshToken=async(req,res)=>{
 try{
       const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                error: "Refresh token is not found"
            });
        }

         // Verify old refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_SECRET
        );

        // Hash old refresh token
        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        // Find active session
        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked: false
        });

        if (!session) {
            return res.status(401).json({
                error: "Invalid refresh token"
            });
        }

         // Revoke old session
        session.revoked = true;
        await session.save();

        // Create new refresh token
        const newRefreshToken = jwt.sign(
            {
                userId: decoded.userId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // Hash new refresh token
        const newRefreshTokenHash = crypto
            .createHash("sha256")
            .update(newRefreshToken)
            .digest("hex");

        // Create new session
        await sessionModel.create({
            user: decoded.userId,
            refreshTokenHash: newRefreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        });

        // New access token
        const accessToken = jwt.sign(
            {
                userId: decoded.userId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        // New refresh cookie
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Access token refreshed successfully",
            accessToken
        });

 
    } catch (error) {
        console.error("Refresh token error:", error);

        return res.status(401).json({
            error: "Invalid or expired refresh token"
        });
    }
};


// =========================
// LOGOUT FROM ALL DEVICES
// =========================

export const logoutFromAll=async(req,res)=>{
    
    try{

         // Revoke all active sessions
         await sessionModel.updateMany({
            businessLogin:req.businessLoginId,
            revoked:false
         },
         {
            $set:{
                revoked:true
            }
         }
        );
         // Clear current device cookie
         res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:false,
            sameSite:"lax"
         })

         return res.status(200).json({
             message: "Logged out from device successfully"

         })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}