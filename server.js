require('./models/db');
const express = require('express');
const exphbs = require('express-handlebars');
 const Handlebars = require('handlebars');
 const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

const path = require('path');
const bodyparser = require('body-parser');

const employeeController = require('./controllers/employeeController')
const app = express();
app.use(bodyparser.urlencoded({
  extended:true
}))
app.use(bodyparser.json())

app.set('views', path.join(__dirname, '/views/'));
app.engine(
    'hbs',
    exphbs({
      extname: '.hbs',
      defaultLayout: 'mainLayout', 
      layoutsDir: path.join(__dirname, 'views/layouts'), 
      handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
  );
app.set('view engine', 'hbs');
app.listen(3000,()=>{
    console.log('express server started on port:3000');
})
app.use('/employee',employeeController);

