const mongoose = require("mongoose");
const taskSchema = require("../data/taskSchema");

const getAllTast = async (req, res) => {
  try {
    const result = await taskSchema.find();
    return res.status(200).json({
      result: result,
    });
  } catch (error) {
    res.status(404).json({
      "Error Message": error,
    });
  }
};

const addTask = async (req, res) => {
  const task = new taskSchema({
    _id: new mongoose.Types.ObjectId(),
    taskName: req.body.name,
    priority: req.body.priority,
    createdAt: new Date(),
    status: req.body.status || "inProgress",
    dueDate: new Date(req.body.dueDate),
    updatedAt: new Date(),
  });
  try {
    const result = await task.save();
    return res.status(200).json({
      result: result,
    });
  } catch (error) {
    res.status(404).json({
      "Error Message": error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedStatus=await taskSchema.deleteOne({ _id: req.params.id });
    if(deletedStatus.deletedCount>0){
        res.status(201).json({
            message: "task deleted sucessfully",
          });
    }
    else{
        res.status(201).json({
            message: "No task found with that ID",
          });
    }
    
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  console.log(req.body.update);
  

  try {
    const updatedResult=await taskSchema.findOneAndUpdate({ _id: req.params.id },req.body.update);
    console.log("hi")
    if(updatedResult){
        res.status(201).json({
            message: "task updated sucessfully",
          });
    }
    else{
        res.status(201).json({
            message: "No task found with that ID",
          });
    }
    
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = { getAllTast, addTask, deleteTask ,updateTask};
