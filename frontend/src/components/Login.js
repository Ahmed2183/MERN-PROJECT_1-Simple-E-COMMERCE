import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'; 

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [emptyerror,setEmptyerror] = useState(false);

    const navigate = useNavigate();

//Use useEffect agr user direct bi login page par jai ga login ka baad tu nhi jaskay ga
    useEffect(()=>{
        const auth = localStorage.getItem("User"); //getItem is used to get data and show in localStorage
        if(auth) //Login krna ka baad Products page pr move hojai
        {
            navigate('/');
        }
    })

    const logindata = async () => {

       //For Validation
      if(!email || !password)
      {
          setEmptyerror(true);
          return false; //return false means return sa upr upr wala code chla ga
      }

      //Fetch data from API
        console.log(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:'POST',  
            body:JSON.stringify({email,password}), 
            headers:{ 
                'Content-Type':'application/json'
            },
        })
        result = await result.json(); 
        console.log(result);
        // if(result.email)
        // {
        //     localStorage.setItem("User",JSON.stringify(result));
        //     navigate("/")
        // }
        if(result.auth) //-->Means if auth means token hoga tab user login hoga
        { //result.user or result.auth means two alag alag fields hai one is in which user data 
          //and second is in which auth data so alag alag localStorage mai add krna hoga
          //Check in console after login
            localStorage.setItem("User",JSON.stringify(result.user));
            localStorage.setItem("Token",JSON.stringify(result.auth));
            navigate("/")
        }
        else
        {
            alert("Invalid Email and Password");
        }
    }

    return (
        <div className='login-register'>
            <h1>Login Page</h1>
            <input className='signup-inputBox' type="text" placeholder='Enter Email'
            onChange={(e)=>setEmail(e.target.value)}
            value={email}/>
            { //Jab inputerror true ho means koi bi input textbox empty ho ya sab empty ho !email means email inputbox empty ho
                emptyerror && !email &&
                <span className='validation'>Enter Valid Email</span>
            }
            <input className='signup-inputBox' type="password" placeholder='Enter Password'
            onChange={(e)=>setPassword(e.target.value)}
            value={password}/>
            { //Jab error true ho means koi bi input textbox empty ho ya sab empty ho
                emptyerror&& !password &&
                <span className='validation'>Enter Valid Password</span>
            }
            <button className='signup-button' type='button'
            onClick={logindata} 
            >Login</button>
        </div>
    );
};

export default Login;