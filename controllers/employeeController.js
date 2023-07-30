const express = require('express');
const { log } = require('handlebars');
const router = express.Router();
const mongoose = require('mongoose')
const Employee = mongoose.model('Employee');


 router.get('/',(req,res)=>{
   res.render('employee/addOrEdit',{
    viewTitle:"Insert employee"
   })
 });
 

//  router.post('/',(req,res)=>{
//   if(req.body._id == ' ')
//    inserRecord(req,res)
//    else
//    updateRecord(req,res)
//  })

router.post('/', (req, res) => {
  if (req.body._id == '') 
  insertRecord(req, res);
  else 
  updateRecord(req, res);
});

// router.patch('/:_id')

 function insertRecord(req,res){
     var employee  = new Employee();
     employee.fullName = req.body.fullName;
     employee.email = req.body.email;
     employee.mobile = req.body.mobile;
     employee.city = req.body.city;
   employee.save()
  .then(function (){
    res.redirect('employee/list');

  })
  .catch(function(err){
    if(err.name == 'validationError'){
                  handleValidationError(err, req.body);
                res.render('employee/addOrEdit',{
                     viewTitle:"Insert employee",
                     employee:req.body  
                  })     
                 }           
                 else
              console.log('error during record insertion :' + err);
  })    
 }

//  function updateRecord(req, res) {
//   Employee.findOneAndUpdate(
//     { _id: req.body._id },
//     req.body,
//     { new: true }).then(()=>{
//       res.redirect("employee/list")
//     }).catch(function(err){
//       if(err.name == 'validationError'){
//                     handleValidationError(err, req.body);
//                   res.render('employee/addOrEdit',{
//                        viewTitle:"Insert employee",
//                        employee:req.body  
//                     })     
//                    }           
//                    else
//                 console.log('error during record insertion :' + err);
//     })    
// }

// function updateRecord(req, res) {
//   Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
//       if (!err) { res.redirect('employee/list'); }
//       else {
//           if (err.name == 'ValidationError') {
//               handleValidationError(err, req.body);
//               res.render("employee/addOrEdit", {
//                   viewTitle: 'Update Employee',
//                   employee: req.body
//               });
//           }
//           else
//               console.log('Error during record update : ' + err);
//       }
//   });
// }
async function updateRecord(req, res) {
  try {
    const doc = await Employee.findByIdAndUpdate(
    req.body._id ,
      req.body,
      { new: true }
    );
    
    
    res.redirect('employee/list');
  } catch (err) {
    if (err.name === 'ValidationError') {
      handleValidationError(err, req.body);
      res.render("employee/addOrEdit", {
        viewTitle: 'Update Employee',
        employee: req.body
      });
    } else {
      console.log('Error during record update : ' + err);
    }
  }
}


  router.get('/list',(req,res)=>{
  Employee.find().then((docs)=>{
    res.render("employee/list" , {
      list:docs
    })
  }).catch(()=>{
    console.log("errors listt retriving employee  list" + err);
  })
  })

  function handleValidationError(err,body){
    for(field in err.errors){
      switch(err.errors[field].path){
        case 'fullName':
          body['fullNameError'] = err.errors[field].message;
          break;
          case 'email':
            body['emailError'] = err.errors[field].message;
            break;
            default:
              break;
          
      }
    }
  }

  router.get('/:id',(req,res)=>{
  Employee.findById(req.params.id).then((doc)=>{
    if(doc){
      res.render("employee/addOrEdit",{
        viewTitle:"Update Employee",
        employee:doc
      })
    }
  })
  })



   router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove(req.params.id).then((doc)=>{
      if(doc){
        res.redirect('/employee/list');
      }
      else{
        console.log("error");
      }
    }).catch((err)=>{
      console.log(err);
    })
   })
 module.exports  = router;