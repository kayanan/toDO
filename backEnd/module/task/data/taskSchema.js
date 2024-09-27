const {Schema, default: mongoose} =require("mongoose");

const taskSchema=new Schema({
    _id:Schema.Types.ObjectId,
    taskName:{ type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status:{type:String,enum: ['pending', 'inProgress', 'completed'], default: 'inProgress' },
    dueDate: { type: Date, default: null },
    updatedAt: { type: Date, default: Date.now },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
})

module.exports=mongoose.model("Task",taskSchema);