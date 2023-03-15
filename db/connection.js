import mongoose from "mongoose";

const db="mongodb+srv://admin:admin@stack-overflow-clone.yxzku6h.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log("DataBase Connected")).catch((err)=>{
    console.log(err);
})

