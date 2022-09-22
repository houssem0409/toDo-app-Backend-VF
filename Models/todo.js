const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const todoSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength:32,
        unique: true
    },
    completed: {
        type: Boolean,
       default : false
    },
    user: {
        type: ObjectId,
        ref: 'User',
    },
    
}, 
{timestamps:true}
);



module.exports = mongoose.model("Todo" ,  todoSchema);
