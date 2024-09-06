import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
const Verify = () => {

    // The useSearchParams hook is used to read and modify the query string in the URL for the current location.

    //finding url parameters
    const[searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");

    // console.log(success,orderId);

    //backend url from context api
    const{url}=useContext(StoreContext);
    const navigate=useNavigate();

    const verifyPayment= async() =>{
        const response=await axios.post(url+"/api/order/verify",{success,orderId});
    
        if(response.data.success)
        {
          navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }

   useEffect(()=>{
        verifyPayment();
   },[])



  return (
    
    <div className='verify'>

{/* diplaying spinner on web page ,till order is verified */}
    
    <div className="spinner">
        
    </div>
    </div>
  )
}

export default Verify
