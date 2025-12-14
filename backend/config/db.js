const mongoose=require('mongoose');

const connectDb=async()=>{
    try {
        
        await mongoose.connect(process.env.MONGO_URL+"/ET");
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDb" ,error);
        process.exit(1);
    }
}

module.exports=connectDb;