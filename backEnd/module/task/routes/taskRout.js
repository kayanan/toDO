const {Router} =require("express");
const taskRoute=Router();
const taskController=require("../controller/task.controller")

taskRoute.route("/").get(taskController.getAllTast).post(taskController.addTask);
taskRoute.route("/:id").patch(taskController.updateTask).delete(taskController.deleteTask)

module.exports=taskRoute;