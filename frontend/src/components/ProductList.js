import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {

 const [products,setProducts] = useState([]);

 useEffect(()=>{
     getProducts();
 },[]);

 //Get Products
const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
        //Send token in API
        //For Check Console>Network>products>Headers>Authorization
        headers: {
            Authorization: `Hello ${JSON.parse(localStorage.getItem('Token'))}` //Authorization is our key that we take from POSTMAN in Headers column that we used in key inputbox
        } //'Token'is our localStorage name in which our token stored
          //Hello is our keyword that we used before token in POSTMAN
    });
    result = await result.json();
    setProducts(result);
}
// console.log("Products",products);

//Delete Products
const deleteProduct = async  (id) => {
let result = await fetch(`http://localhost:5000/products/${id}`,{
    method:"Delete",
    headers: {
        Authorization: `Hello ${JSON.parse(localStorage.getItem('Token'))}` 
        }
});
result = await result.json();
if(result)
{
    getProducts();
    alert("Product Deleted");
}

};

const searchProducts = async (event) => {
// console.log(event.target.value)
let key = event.target.value;
if(key)
{
let result = await fetch(`http://localhost:5000/search/${key}`,{
    headers: {
        Authorization: `Hello ${JSON.parse(localStorage.getItem('Token'))}` 
    }
});
result = await result.json();
if(result)
{
    setProducts(result)  //-->setProducts our state name
}
}
else  
{ //This else is for first if{}, If nothing in Search input box then show all products
    getProducts();
}
}

    return (
        <div className='product-list'>
            <h1>Products List</h1>
            <input className='product-list-search ' type="text" 
            onChange={searchProducts}
            placeholder='Search Product'/>
            <ul className='product-list-format'>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            { /*index+1 means numbering start from 1 */
            //products.length > 0 if result not match while Searching Products then show <h1>No Result Found</h1>
              products.length > 0 ?  products.map((item,index)=>
                <ul key={item._id}>  
                <li>{index+1}</li> 
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li><Link className='span' to=""
                 onClick={()=>deleteProduct(item._id)}>Delete</Link>
                  &nbsp;
                 <Link className='span' to={"/update/"+item._id}>Update</Link></li> {/* -->To get id on URL */}
            </ul>
            
                )
                :
                <h1>No Result Found</h1>
            }
        </div>
    );
};

export default ProductList;