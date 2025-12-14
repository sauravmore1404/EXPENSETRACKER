const express=require('express');
const { protect } = require('../middlewares/authMiddleware');
const { addIncome, 
        getAllIncome, 
        deleteIncome, 
        downloadIncomeExcel } 
        = require('../controllers/incomeController');


const incomeRouter=express.Router();

incomeRouter.post('/add',protect,addIncome);
incomeRouter.get('/get',protect,getAllIncome);
incomeRouter.get('/downloadexcel',protect,downloadIncomeExcel);
incomeRouter.delete("/:id",protect,deleteIncome);

module.exports=incomeRouter;