import React, { useContext, useState  } from 'react'
import "./LoginPopup.css"

import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

  const{url,setToken}=useContext(StoreContext)

  
  const[currState,setCurrState]=useState("Login")


    const[data,setData]=useState({
      name:"",
      email:"",
      password:""
    })
   
    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))

    }
   
    const onLogin=async(event)=>{
      // prevents the default form submission behavior. 
      //This is important because you want to handle the form submission via JavaScript
      // and make an API call instead of refreshing the page.
        event.preventDefault()

        let newUrl=url;
        if(currState=="Login")
        {
           newUrl+="/api/user/login"
        }
        else{
          newUrl+="/api/user/register"
        }
        //using axios here to send a POST request to the server and manage 
        //the user's session based on the server's response. 
        const response= await axios.post(newUrl,data);
       
        if (response.data.success) {
          setToken(response.data.token);
          //Saves the token to localStorage allowing it to be persisted across page refreshes
          localStorage.setItem("token",response.data.token)
          //after login,to hide loginpopup
          setShowLogin(false)
        }
        else{
          alert(response.data.message)
        }
    
      }
  


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>
              {currState}
            </h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {/* give name only for signup not login */}
            {currState==="Login"?<></>: 
            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
           
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState==="Sign Up"? "Create account":"Login"}</button>
      <div className="login-popup-condition">
        <input type="checkbox" required/>
        <p>By agreeing, I agree to the terms of use & privacy policy</p>
      </div>
      {currState==="Login"? <p>Create a new account?<span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>: 
      <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
     
     
      </form>
    </div>
  )
}

export default LoginPopup
