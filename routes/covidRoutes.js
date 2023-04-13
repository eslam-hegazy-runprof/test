const express=require('express');
const {createCovid,getAllCovid,getCovid,updateCovid,removeCovid,getDistance}=require("../service/covidServices");
const router=express.Router();

router.route('/').get(getAllCovid).post(createCovid);
router.route('/:id').get(getCovid).put(updateCovid).delete(removeCovid);
router.route('/getDistance').post(getDistance);
module.exports=router;