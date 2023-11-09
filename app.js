const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

// const Connection = require("mysql/lib/Connection");

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// STATIC FILES
app.use(express.static("public"));

// TEMPLATE ENGINE
const handlebars = exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");


const routes = require('./server/routes/students');
app.use('/',routes);

// LISTEN PORT
app.listen(port, ()=>{
    console.log("Listening Port : "+ port);
})
