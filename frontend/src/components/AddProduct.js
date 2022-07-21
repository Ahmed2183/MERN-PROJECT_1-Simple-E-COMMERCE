import React,{useState} from 'react';

const AddProduct = () => {

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const [error,setError] = useState(false);

    const addproductdata = async () => {

      //For Validation
      if(!name || !price || !category || !company)
      {
          setError(true);
          return false; //return false means return sa upr upr wala code chla ga
      }

        console.log(name,price,category,company);
        //Users r Products ki unique id database mai _id variable mai store hoti ha
        //userId is variable name
        //_id is our user id that is already stored in localStorage after login
        const userId = JSON.parse(localStorage.getItem('User'))._id; 
        let result = await fetch('http://localhost:5000/addproduct',{
            method:'POST',  
            body:JSON.stringify({name,price,category,company,userId}), 
            headers:{ 
                'Content-Type':'application/json',
                Authorization: `Hello ${JSON.parse(localStorage.getItem('Token'))}`
            },
        })
        result = await result.json();
        console.log(result);
        // alert("Product Added");
        // localStorage.setItem("Product",JSON.stringify(result)); //Add Product data in LocalStorage
    }

    return (
        <div className='signup-register'>
            <h1 className='App-ul'>Add Product</h1>
            <input className='signup-inputBox' type="text" placeholder='Enter Product Name'
            onChange={(e)=>setName(e.target.value)}
            value={name}
            />
            { //Jab error true ho means koi bi input textbox empty ho ya sab empty ho
            //!name means name input textbox empty ho then Error Message Show
                error && !name &&
                <span className='validation'>Enter Valid Name</span>
            }
            <input className='signup-inputBox' type="number" placeholder='Enter Product Price'
            onChange={(e)=>setPrice(e.target.value)}
            value={price}
            />
            {//!price means price input textbox empty ho then Error Message Show
                error && !price &&
                <span className='validation'>Enter Valid Price</span>
            }
            <input className='signup-inputBox' type="text" placeholder='Enter Product Category'
            onChange={(e)=>setCategory(e.target.value)}
            value={category}
            />
            {//!category means category input textbox empty ho then Error Message Show
                error && !category &&
                <span className='validation'>Enter Valid Category</span>
            }
            <input className='signup-inputBox' type="text" placeholder='Enter Product Company'
            onChange={(e)=>setCompany(e.target.value)}
            value={company}
            />
            {//!company means company input textbox empty ho then Error Message Show
                error && !company &&
                <span className='validation'>Enter Valid Company</span>
            }
            <button className='signup-button' type='button'
            onClick={addproductdata}
            >Add Product</button>
        </div>
    );
};

export default AddProduct;