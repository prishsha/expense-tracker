import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useFinancialRecords } from "../contexts/financial-record";
 // Adjust the import path

const ExpensePieChart = () => {
  const { records } = useFinancialRecords();

  const formattedData = records.reduce((acc, expense) => {
    const found = acc.find((item) => item.name === expense.category);
    if (found) {
      found.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

  return (
    <div className="flex justify-center items-center h-screen">
      <PieChart width={400} height={400}>
        <Pie
          data={formattedData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpensePieChart;
