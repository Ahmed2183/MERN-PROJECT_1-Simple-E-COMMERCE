//Create Model
//Every Collection have own seperate model

const mongoose = require('mongoose'); //-->Load mongoose here

//Create Schema userSchema is name use any name which you want
const userSchema = new mongoose.Schema({

  //Write all users table data names and datatypes  
  name:String,
  email:String,
  password:String

}); 

//In model we give table name and Schema in parenthesis
module.exports = mongoose.model("users",userSchema); //-->users in parenthesis our table name