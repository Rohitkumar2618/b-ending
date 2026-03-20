// Express ko import kar rahe hain (server aur routes banane ke liye)
const express = require("express")

// User model import (MongoDB schema jo user ka data handle karega)
const userModel = require("../models/user.model")

// JWT import (token generate karne ke liye - authentication me use hota hai)
const jwt = require("jsonwebtoken")

// Router create kar rahe hain (alag file me routes manage karne ke liye)
const authRouter = express.Router()



// ================= REGISTER API =================
authRouter.post("/register", async (req, res) => {

    // req.body se frontend se aaya data destructure kar rahe hain
    const { name, email, password } = req.body
    
    // Database me check kar rahe hain ki same email wala user already hai ya nahi
    const isUserAlreadyExist = await userModel.findOne({ email })

    // Agar user already exist karta hai toh error response bhejenge
    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exist"
        })
    }
    
    // Agar user exist nahi karta toh new user create karenge database me
    const user = await userModel.create({
        name,       // user ka name
        email,      // user ka email
        password    // user ka password (NOTE: ideally hash karna chahiye)
    })


    // JWT token generate kar rahe hain (user ko identify karne ke liye)
    const token = jwt.sign(
        {
            id: user._id,        // user ka unique MongoDB ID
            email: user.email   // user ka email
        },
        process.env.JWT_SECRET // secret key jo .env file me hoti hai
    )


    // Token ko cookie me store kar rahe hain (browser me save ho jayega)
    res.cookie("jwt_token", token)

    // Client ko success response bhej rahe hain
    res.status(201).json({
        message: "User Created Successfully",
        user,   // created user ka data
        token   // generated JWT token
    })

})


// Router ko export kar rahe hain taaki main server file me use ho sake
module.exports = authRouter