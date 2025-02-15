import mongoose from "mongoose";

const financialRecordSchema = mongoose.Schema({
    userId : {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    amount: {type: Number, required: true},
    category: {type: String, required: true}
});

export default mongoose.model("Record", financialRecordSchema);