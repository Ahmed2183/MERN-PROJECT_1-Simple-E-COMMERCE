//Short command of arrow function rsc
import React from 'react';
import {Link,useNavigate} from 'react-router-dom';

const Nav = () => {

    const auth = localStorage.getItem("User"); //User is our key that we define in SignUp.js and that show in our browser inspect>applictaion>localStorage
    const navigate = useNavigate(); //useNavigate also rerender component means refresh browser

    const logout = () => {
        localStorage.clear(); //Clear local Storage data
        navigate('/login');
    }

    return (
        <div>
            <img
            className='nav-logo' 
            alt="logo"
            src="https://www.graphicsprings.com/filestorage/stencils/1cf0e62090ebd950855b702c81587979.png?width=500&height=500"
            />
            { //When user login then following Products link show
            auth ?
            <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                {/* <li><Link to="/update">Update Products</Link></li> */}
                <li><Link to="/profile">Profile</Link></li>
                <Link onClick={logout}   to="/login">Logout ({JSON.parse(auth).name})</Link> 
 {/*({JSON.parse(auth).name}) In auth we have localStorage and when we remove from storage so it is in 
 String Format so First convert into JSON */}               
                </ul>
                //User before login only signup login show
                       : 
                       <ul className='nav-ul nav-right'>
                       <li><Link to="/signup">SignUp</Link></li>
                       <li><Link to="/login">Login</Link></li>
                       </ul>
                 }
            <img
            className='nav-screenlogo' 
            alt="logo"
            src="https://www.graphicsprings.com/filestorage/stencils/1cf0e62090ebd950855b702c81587979.png?width=500&height=500"
            />
               </div>
    );
};

export default Nav;
