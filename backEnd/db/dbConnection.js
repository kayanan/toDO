const {connect} =require("mongoose");


const dbConnection=async()=>{
    try{
        await connect(process.env.MONGO_URL ||"");
    }
    catch(error){
        console.log(error);
    }
   
}
module.exports=dbConnection