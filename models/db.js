const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/EmpolyeeDB').then(()=>{
   console.log('successfull');
}).catch(()=>{
    console.log('err');
})
    

require('../models/employee.model')