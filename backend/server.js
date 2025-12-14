require("dotenv").config();
const express=require('express');

const cors=require('cors');
const path=require('path');
const connectDb = require("./config/db");

const authRouter=require('./routes/authRouter');
const incomeRouter = require("./routes/incomeRouter");
const expenseRouter = require("./routes/expenseRouter");
const dashboardRouter = require("./routes/dashboardRouter");

const app=express();

//Middleware to handle CORS

app.use(
    cors(
        {
        origin: process.env.CLIENT_URL || "*",
        methods:["GET" , "POST" ,"PUT" ,"DELETE"],
        allowedHeaders:["Content-Type","Authorization"]
        }
    )
)

app.use(express.json());

connectDb();

app.get('/',(req,res)=>{
    return res.json({message:"test successfull"});
})

app.use('/api/v1/auth',authRouter);

app.use('/api/v1/income',incomeRouter);

app.use('/api/v1/expense',expenseRouter);

app.use('/api/v1/dashboard',dashboardRouter);


//server uploads folder
app.use('/uploads',express.static(path.join(__dirname,"uploads")))

const PORT=process.env.PORT || 5000;

console.log(new Date)
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})
