import React,{useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'; 
//useParams to get id from url you can get any thing instead of id like name,price etc set in ProductList <Link> tag in to={"/update/"+item._id}

const UpdateProduct = () => {

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const params = useParams(); //useParams() store in params variable
    const navigate = useNavigate(); //useNavigate() store in navigate variable


    useEffect(()=>{
   getProductDetails();
    },[])

    //get data in textboxes after click on update link
    const getProductDetails = async () => {
     console.log(params);
     let result = await fetch(`http://localhost:5000/products/${params.id}`,{
        headers: {
            Authorization: `Hello ${JSON.parse(localStorage.getItem('Token'))}` 
            }
     });
     result = await result.json();
     //Show results 
     setName(result.name); 
     setPrice(result.price);
     setCategory(result.category);
     setCompany(result.company);
    }

    const updateproductdata = async () => {
        console.log(name,price,category,company);
        let result = await fetch(`http://localhost:5000/products/${params.id}`,{
            method:"PUT",
            body:JSON.stringify({name,price,category,company}), 
            headers:{ 
                'Content-Type':'application/json',
                Authorization: `Hello ${JSON.parse(localStorage.getItem('Token'))}`
            },

        });
        result = await result.json();
        console.log(result);
        navigate("/"); //navigate to product page
    }

    return (
        <div className='signup-register'>
            <h1 className='App-ul'>Update Product</h1>
            <input className='signup-inputBox' type="text" placeholder='Enter Product Name'
            onChange={(e)=>setName(e.target.value)}
            value={name}
            />
            
            <input className='signup-inputBox' type="number" placeholder='Enter Product Price'
            onChange={(e)=>setPrice(e.target.value)}
            value={price}
            />
            
            <input className='signup-inputBox' type="text" placeholder='Enter Product Category'
            onChange={(e)=>setCategory(e.target.value)}
            value={category}
            />
            
            <input className='signup-inputBox' type="text" placeholder='Enter Product Company'
            onChange={(e)=>setCompany(e.target.value)}
            value={company}
            />
            
            <button className='signup-button' type='button'
            onClick={updateproductdata}
            >Update Product</button>
        </div>
    
    );
};

export default UpdateProduct;