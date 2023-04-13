const mongoose =require("mongoose");
//Connect to DB
const dbConnections=()=>{
    mongoose.connect(process.env.DB).then((val)=>{
        console.log(`Database Connected: ${val.connection.host}`);
    }).catch((err)=>{
        console.log(`Database Error: ${err}`);
        process.exit(1);
    });
}
module.exports=dbConnections;