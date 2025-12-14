const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

//Generate JWT token

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1h'})
}

//Register User
const registerUser=async(req,res)=>{
    const {fullName,email,password,profileImageUrl}=req.body;

    //Validation : Check for missing fields
    if(!fullName || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try {
        //Check if email alredy exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exist with this email"});
        }
       //Hash password before saving
       const hashedPass=await bcrypt.hash(password,10);

        //Create the user
        const user =await User.insertOne({
            fullName,
            email,
            password:hashedPass,
            profileImageUrl
        });
        return res.status(201).json({
            id:user._id,
            user,
            token:generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({message:"Error registering User = " ,error:error.message});
    }
}

//Login User
const loginUser=async(req,res)=>{
   try {
     const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid Email"});
    }
    const isMatched=await bcrypt.compare(password,user.password);
    if(!isMatched){
        return res.status(400).json({message:"Invalid Password"});
    }
    return res.status(201).json({
            id:user._id,
            user,
            token:generateToken(user._id)
        })
   } catch (error) {
        res.status(500).json({message:"Error registering User = " ,error:error.message});
   }
}


// User
const getUserInfo=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:"Error registering User = " ,error:error.message});
    }
}

module.exports={getUserInfo,loginUser,registerUser}