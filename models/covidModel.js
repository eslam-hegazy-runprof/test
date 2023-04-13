const mongoose=require("mongoose");
const { Schema } = mongoose;
const covidSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location: {
        type: {type : String, required: true},
        coordinates : [Schema.Types.Mixed]
    },

},{timestamps:true},);

// Indexes this schema in 2dsphere format
covidSchema.index({location: '2dsphere'});

const covidModel=mongoose.model('covidUser',covidSchema);

module.exports=covidModel;