import React, {useState} from 'react'
import { useFinancialRecords } from "../contexts/financial-record"
import { useUser } from '@clerk/clerk-react'

const Form = () => {
    const {user} = useUser();
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const {addRecord} = useFinancialRecords();
 
    const handleSubmit = async(e) => 
    {
        e.preventDefault();

        const newRecord = {
            userId: user?.id ?? "",
            date: new Date(),
            description: description, 
            amount: parseFloat(amount),
            category:category
        };

        
        try{
            await addRecord(newRecord);
            setDescription("");
            setAmount("");
            setCategory("");
            alert("Record added successfully!");
        }
        catch(error){
            console.error('Error adding record: ' , error);
            alert('Failed to add record. Please try again');
        }
    }
  return (
    <div className='form-container'>
        <form onSubmit={handleSubmit}>
            <div className='form-container-1'>
                <label>Description:</label>
                <input 
                    type='text' 
                    required 
                    className='input' 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='form-container-1'>
                <label>Amount:</label>
                <input 
                    type='number' 
                    required 
                    className='input' 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div className='form-container-1'>
                <label>Category:</label>
                <select 
                    required   
                    className='input' 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    <option value="food">Food</option>
                    <option value="rent">Rent</option>
                    <option value="salary">Salary</option>
                    <option value="utilities">Utilities</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <button type="submit" className='button'>Add Expense</button>
        </form>
      </div>
  )
}

export default Form
