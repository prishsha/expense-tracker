import express from 'express';
import mongoose from 'mongoose';
import financialRecord from '../schema/financial-record.js';

const router = express.Router();

//GET Request
router.get("/getAllByUserId/:userId", async(req, res) => {
    try{
        const userId= req.params.userId;
        const records = await financialRecord.find({userId : userId});
        if(records.length === 0){
            return res.status(404).send("No record found for user");
        }
        else{
            return res.status(200).send(records);
        }
    }
    catch(err){
        return res.status(500).send(err);
    }
});

//POST Request
router.post("/", async(req, res) => {
    try{
        const newRecordBody = req.body;
        const newRecord = new financialRecord(newRecordBody);
        const savedRecord = await newRecord.save();
        
        res.status(201).json({
            message: 'Record created successfully',
            data: savedRecord,
        });
    }
    catch(err){
        return res.status(500).send(err);
    }
});

//UPDATE Request
router.put("/:id", async(req, res) => {
    try{
        const id= req.params.id;
        const newRecordBody = req.body;
        const record = await financialRecord.findByIdAndUpdate(
            id, 
            newRecordBody,
            {new: true},
        );
        
        if(!record)
        {
            return res.status(404).send();
        }

        res.status(201).json({
            message: 'Record updated successfully'
        });
    }
    catch(err){
        return res.status(500).send(err);
    }
});

//DELETE Request
router.delete("/:id", async(req, res) => {
    try{
        const id= req.params.id;
        const record = await financialRecord.findByIdAndDelete(
            id
        );
        
        if(!record)
        {
            return res.status(404).send();
        }

        res.status(201).json({
            message: 'Record deleted successfully'
        });
    }
    catch(err){
        return res.status(500).send(err);
    }
});

export default router;