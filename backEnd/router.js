const taskRoute =require("./module/task/routes/taskRout")
const mainRouter=(app)=>{
app.use("/task",taskRoute)

}

module.exports=mainRouter