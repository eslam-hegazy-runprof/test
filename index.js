const express=require("express");
const dotenv=require("dotenv");
const morgan=require("morgan");
const mongoose=require("mongoose");
//Service
dotenv.config({path:"config.env"});
const app=express();
app.use(express.json());

//App Routes
const dbConnections=require("./config/dbConnected");
const covidRoute=require('./routes/covidRoutes');
const ApiError = require("./utils/apiError");
//Connection Database
dbConnections();


//MiddleWare
if(process.env.NODE_ENV=="development"){
    app.use(morgan('dev'));
    console.log(`Model: ${process.env.NODE_ENV}`);
}
//Global Error Handling
// app.all('*',(req,res,next)=>{
//     next(new ApiError(`Cant't find this route: ${req.originalUrl}`,500));
// });
// app.use(globalError);

//Router
app.use('/api/covid',covidRoute);

//Server
const PORT=process.env.PORT||8080;
app.listen(PORT,()=>{
    console.log(`Server Running ${PORT}...`);
});
