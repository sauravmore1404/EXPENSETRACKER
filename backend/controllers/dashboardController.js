const Expense = require("../models/Expense")
const Income = require("../models/Income")
const {isValidObjectId, Types}=require('mongoose')

//Dashboard Data
exports.getDashboardData=async(req,res)=>{
    try {
        const userId=req.user.id;
        const userObjectId=new Types.ObjectId(String(userId));

        //Fetch total income & expenses
        const totalIncome=await Income.aggregate([
            {$match:{userId:userObjectId}},
            {$group:{_id:null,total:{$sum:"$amount"}}}
        ]);

        console.log("total income = ",{totalIncome,userId:isValidObjectId(userId)});

        const totalExpense=await Expense.aggregate([
            {$match:{userId:userObjectId}},
            {$group:{_id:null,total:{$sum:"$amount"}}}
        ]);

        console.log("total expense = ",{totalExpense,userId:isValidObjectId(userId)});

        //Get income transitions in the last 60 days

        const last60DaysIncomeTransactions=await Income.find({
            userId,
            date:{$gte:new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)}
        }).sort({date:-1});

        console.log("last60DaysIncomeTransactions = ",last60DaysIncomeTransactions)
        //Get total income for last 60 days
        const incomeLast60Days=last60DaysIncomeTransactions.reduce(
            (sum,transaction)=> sum + transaction.amount,
            0
        );
        console.log("incomeLast60Days = ",incomeLast60Days)

        //Get expenses transactions in last 30 days
        const last30DaysExpensesTransaction=await Expense.find({
            userId,
            date:{$gte : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
        }).sort({date:-1});

        console.log("last30DaysExpensesTransaction = ",last30DaysExpensesTransaction)


        //Get total expenses for last 30 days
        const expensesLast30Days=last30DaysExpensesTransaction.reduce(
            (sum,transaction)=>sum + transaction.amount , 0
        )

        console.log("expensesLast30Days = ",expensesLast30Days)

        //Fetch last 5 transaction (income + expenses)
        const lastTransactions=[
            ...(await Income.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"income"
                }),    
            ),
            ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"expense"
                })
            )
        ].sort((a,b)=>b.date - a.date); //sort latest first

        console.log("lastTransactions = ",lastTransactions)


        //final response
        res.json({
                totalBalance:
                    (totalIncome[0]?.total || 0) -(totalExpense[0]?.total || 0),
                    totalIncome:totalIncome[0]?.total || 0 ,
                    totalExpense:totalExpense[0]?.total || 0 ,
                    last30DaysExpenses:{
                        total:expensesLast30Days,
                        transactions:last30DaysExpensesTransaction,   
                    },
                    last60DaysIncome:{
                        total:incomeLast60Days,
                        transaction:last60DaysIncomeTransactions
                    },
                    recentTransaction:lastTransactions  
        });
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
}