import React, { useEffect, useState } from 'react';
import CustomBarChart from '../Charts/CustomBarChart';
import {LuPlus} from 'react-icons/lu';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({transactions,onAddIncome}) => {

   const [chartData,setChartData]=useState([]);

   useEffect(()=>{
        const result=prepareIncomeBarChartData(transactions);
        setChartData(result);
    return ()=>{}
   },[transactions]);
  return (
    <div className='card'>
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-between">
            <h5 className='text-lg'>Income Overview</h5>
            <p className="text-xs text-gray-400 mt-0.5">
                Track your earnings over time and analyze your income trends.
            </p>

            <button className="add-btn" onClick={onAddIncome}>
                <LuPlus className='text-lg' />
                Add Income
            </button>
        </div>

        <div className="mt-10">
            <CustomBarChart 
              data={chartData}  
            />
        </div>
    </div>
  )
}

export default IncomeOverview
