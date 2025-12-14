const express=require('express');
const {protect}=require('../middlewares/authMiddleware')
const {
    registerUser,
    loginUser,
    getUserInfo
} =require('../controllers/authController');
const upload = require('../middlewares/uploadMiddleware');

const authRouter=express.Router();

authRouter.post('/register',registerUser);

authRouter.post('/login',loginUser);

authRouter.get('/getUser',protect ,getUserInfo); 


authRouter.post('/upload-image',upload.single('image'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"});
    }
    const imageUrl=`${req.protocol}://${req.get('host')}/uploads/${
        req.file.filename
    }`;
    return res.status(200).json({imageUrl});
})


module.exports=authRouter;