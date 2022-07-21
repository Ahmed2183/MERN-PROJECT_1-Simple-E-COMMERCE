import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'; //Used to redirect page

const SignUp = () => {
    //Create States using useState
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(false);
    const navigate = useNavigate();//-->useNavigate used here

    //Use useEffect agr user direct bi signup page par jai ga signup ka baad tu nhi jaskay ga
    useEffect(()=>{ //When user signup then SignUp link not show only Logout link show
        const auth = localStorage.getItem("User"); //getItem is used to get data and show in localStorage
        if(auth) //Signup krna ka baad Products page pr move hojai
        {
            navigate('/');
        }
    })
    

    //Create Function for Add data API
    //async with await is used to handle promises we also use .then that we used in React js course Program10 Restaurant App
    const signupdata = async () =>{

      //For Validation
      if(!name || !email || !password)
      {
          setError(true);
          return false; //return false means return sa upr upr wala code chla ga
      }
     
        // console.log(name,email,password);
        let result = await fetch('http://localhost:5000/signup',{
            method:'POST',  //-->method define which method we used in POSTMAN here is POST  method
            body:JSON.stringify({name,email,password}), //body ko stringify krkay bhjna hota ha ismai state ka data pass krtay hai
            headers:{ //-->In headers we define which type of our content so our content is json type
                'Content-Type':'application/json'
            },
        })
        result = await result.json(); //use await bcz result return promises you also used .then
        console.log(result);
        // // localStorage.setItem("User",JSON.stringify(result)); //setItem is used to add data in localStorage
        // //User is key in our browser inspect>applictaion>localStorage, JSON.stringify convert result into string
        
         //result.result or result.auth means two alag alag fields hai one is in which result data 
        // // //and second is in which auth data so alag alag localStorage mai add krna hoga
        // // //Check in console after login
        localStorage.setItem("User",JSON.stringify(result.result));
        localStorage.setItem("Token",JSON.stringify(result.auth));
        alert("Registered Successfully");
        navigate('/');
         //-->Signup krna ka baad Products page pr move hojai
        // setName('');  //-->For clear data on input textboxes
        // setEmail('');
        // setPassword('');
    }
    

    return (
        <div className='signup-register'>
            <h1>SignUp Page</h1>
            <input className='signup-inputBox' type="text" placeholder='Enter Name'
            onChange={(e)=>setName(e.target.value)}
            value={name}
            />
            { //Jab error true ho means koi bi input textbox empty ho ya sab empty ho and !name means name inputbox empty ho
                error && !name &&
                <span className='validation'>Enter Valid Email</span>
            }
            <input className='signup-inputBox' type="text" placeholder='Enter Email'
            onChange={(e)=>setEmail(e.target.value)}
            value={email}/>
            { //Jab error true ho means koi bi input textbox empty ho ya sab empty ho
                error && !email &&
                <span className='validation'>Enter Valid Email</span>
            }
            <input className='signup-inputBox' type="password" placeholder='Enter Password'
            onChange={(e)=>setPassword(e.target.value)}
            value={password}/>
            { //Jab error true ho means koi bi input textbox empty ho ya sab empty ho
                error && !password &&
                <span className='validation'>Enter Valid Email</span>
            }
            <button className='signup-button' type='button'
            onClick={signupdata} 
            >Sign Up</button>
        </div>
    );
};

export default SignUp;