const { request } = require('express');
const express = require('express'); //-->Load express here
const app = express(); //-->Using express here, app is just name
require('./db/config'); //-->import config.js
const User = require('./db/User'); //-->import User.js,const User is just name
const Product = require('./db/Product'); //-->import Product.js
const cors = require('cors');//-->import(Load) cors here
const e = require('express');

//Key ki base par hamara token banta ha
//Key ka name secret rkhna hota ha kisi unknown person ko pata nhi chlna chiya otherwise wo apka 
//token generate kerskta ha
const Jwt = require('jsonwebtoken');//-->import(Load) jsonwebtoken here
const jwtKey = 'e-comm'; //-->Key name is e-comm


//Use express.json() as Middleware
app.use(express.json()); //-->express.json() Jo data ham POST API sa POSTMAN mai send krtay hai usko control krna ka kam ata ha
//Use cors() as Middleware
app.use(cors());//-->cors is used to handle backend error when API call in frontend

//Create Signup URL
//Create Route our API link here signup is our Signup API name
//Using POST Method
//Send data from POSTMAN to MongoDB
app.post("/signup", async (req,resp)=>{ 
    
    //Email Validation in if condition
//    const userExist = await User.findOne({email:req.body.email});
//    if(userExist)
//    {
//        return resp.status(422).json({error: "Email Already Exists"})
//    }
try
{
    //req.body is for Middleware
    let user = new User(req.body); //-->User we define on line const User = require('./db/User'); 
    let result = await user.save(); //-->await is process database sa data nikalnay ka lia yai promises return krta ha,.save is used to save data in mongodb
    result = result.toObject(); //toObject is function that convert result into object
    delete result.password; //When we save data then we remove/delete password like this bcz we dont want to show password
    // resp.send(result);
    Jwt.sign( {result}, jwtKey, {expiresIn: "2h"}, (err, token) => {
        if(err)
        {
            resp.send({result:"Something Went Wrong, Please Try After Sometime"})  
        }
        resp.send({result, auth: token}); //user is our data and second is token auth ki jga token: token bi likh skta hai
    })

    //resp.send("API In Progress....");
    // resp.send(req.body); //req.body is for Middleware
}
catch(err)
{
    console.log(err);
}
})


//Create Route Login URL
app.post("/login", async (req,resp)=>{
    //console.log(req.body);
    //findOne means find only one match result
    //.select("-password") means we dont show password when POST method hit on POSTMAN
    //We use select property when we find some data
    if(req.body.password && req.body.email) //-->This condition is if email and password missing
    {
        let user = await User.findOne(req.body).select("-password"); 
        if(user) 
        {
            //Use .sign in sign parameter we have 4 things first our data which ki user
            //Second jwtKey , third token expire time , fourth is parameter in which two
            //things first is for handel error and second is token
            //expiresIn: "2h" means token expire after 2 hours
            Jwt.sign( {user}, jwtKey, {expiresIn: "2h"}, (err, token) => {
                if(err)
                {
                    resp.send({result:"Something Went Wrong, Please Try After Sometime"})  
                }
                resp.send({user, auth: token}); //user is our data and second is token auth ki jga token: token bi likh skta hai
            })
        }
        else
        {
         resp.send({result:"No User Found"})   
        }
    }
    else
        {
         resp.send({result:"No User Found"})   
        }
})


//Create Route to Add Product URL
app.post("/addproduct", verifytoken, async (req,resp)=>{ 
    
    let product = new Product(req.body); //-->Product we define on line const Product = require('./db/Product');
    let result = await product.save();  //.save is used to save data in mongodb
    resp.send(result);

})


//Create Route to get Products
//We use app.get for get data
//Use find() to get all data
app.get("/products", verifytoken, async (req,resp)=>{
    let products = await Product.find();
    if(products.length>0)
    {
        resp.send(products);
    }
    else
    {
        resp.send({result:"No Products Found"});
    }
})


//Create Route to Delete Products
//Get id with params in API URL
app.delete("/products/:id", verifytoken, async (req,resp)=>{
    const result =  await Product.deleteOne({_id:req.params.id}); //Use deleteOne to delete one id
    resp.send(result);
})

//Agr 2 API's ki url same hogai tu problem nhi hoga par agr method same hwa tu problem hogi jesa
//agr dono get howa y delete hwa tab error hoga

//Create Route to get single product
app.get("/products/:id", verifytoken, async (req,resp)=>{
    const result =  await Product.findOne({_id:req.params.id}); //Use findOne to find single product
    if(result)
    {
        resp.send(result);
    }
    else
    {
        resp.send({result:"No Record Found"})
    }
   
})

//Create Update URl
app.put("/products/:id", verifytoken, async (req,resp)=>{
    let result =  await Product.updateOne(
    {_id:req.params.id}, //Use updateOne to update single product
    { $set: req.body }  //-->Update krna ka lia $ set krna prta ha
    );
    resp.send(result);
})


//Create Search URL
//key means that we define in "$or": [ {name},{company},{category} ] means /search/ ka baad agr "$or"
//mai name ha tu search kraty wqt koi name likhay ga tu wo usi name ko search kra gaa
//agr "$or" mai company ha tu /search/ ka baad company ka name likha ga tu wo usi company ko search kra ga
//name r company dono bi sth search krsktay ha
app.get("/search/:key", verifytoken, async (req,resp) => { //Call verifytoken is our Middleware function name
    let result = await Product.find({
        //In "$or" we define our key
        //If we search in multiple fields then we use "$or"
        "$or":[
            {name:{$regex:req.params.key}}, //-->This is our key here we search by name
            {company:{$regex:req.params.key}}, //-->This is our key here we search by company
            {category:{$regex:req.params.key}}
        ]
    });
    resp.send(result);
})



app.listen(5000); //use any port for ruuning project

//Create MiddleWare for verifying Token
//In Middleware function parameter we have three things req,resp,next
//next:Bina next ka API pr middleware agay process nhi kra ga POSTMAN mai lodaing hoti rahi gi
//Call in any API We call in Search API URL
//Add any keyword in start of token like bearer,hello any word you want and gave space btw keyword and token
function verifytoken(req,resp,next)
{
let token = req.headers['authorization']; //Use 'authorization' with in lowercase, authorization take from Headers in POSTMAN

if(token)
{
// token = token.split(' '); //This line divide our keyword and token into two different parts
// token = token.split(' ')[0]; //[0] menas index 0 par jo hai usa show krwao in index 0 we have our keyword
token = token.split(' ')[1];//[1] menas index 1 par jo hai usa show krwao in index 1 we have token
// console.log("MiddleWare Called",token);
Jwt.verify(token,jwtKey,(err,valid)=>{ //Verify token use verify function, Jwt and jwtKey already we import
    if(err)
    {
        resp.status(401).send({result:"Please Provide Valid Token In Header"}) 
        //(200) status means all thing perfect working
        //We define status (401) if something error
    }
    else
    {
        next();
    }
})
}
else
{
resp.status(403).send({result:"Please Add Token In Header"})
}
// console.log("MiddleWare Called",token);
}





/* Code using in Lecture#8

 const mongoose = require('mongoose'); //-->Load mongoose here

//Create Function here connectDB is function name use any name which you want
//async is used to handle promises
const connectDB = async () => {

//-mongodb local host port and e-commerce is database name    
mongoose.connect('mongodb://localhost:27017/e-commerce'); 

//Create Schema productSchema is name use any name which you want
const productSchema = new mongoose.Schema({}); //-->Empty {} means we get data from database {} is used to get data

//Create Model: In model we give table name and Schema in parenthesis
const myproduct = mongoose.model('product',productSchema);//-->product in parenthesis our table name

//await is process database sa data nikalnay ka lia yai promises return krta ha
const data = await myproduct.find();
console.log(data)

}

connectDB(); //Call Funtion


// app.get("/",(req,resp)=>{  //get method is used for creating API's, here app we get from express
// resp.send("App is working");
// })

*/