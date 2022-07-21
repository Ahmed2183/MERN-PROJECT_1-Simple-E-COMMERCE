//Create Model
//Every Collection have own seperate model

const mongoose = require('mongoose'); //-->Load mongoose here

const productSchema = new mongoose.Schema({

  //Write all data names and datatypes  
  name:String,
  price:String,
  category:String,
  userId:String,
  company:String

}); 

//In model we give table name and Schema in parenthesis
module.exports = mongoose.model("products",productSchema); 