import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const {url,token}=useContext(StoreContext);

   //logic to add user data and save it to state variable
   const[data,setData]=useState([]);

   const fetchOrders=async()=>{
    // api calling
    const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    //saving order data  in the state variable
    setData(response.data.data);
    
   }
   
   //calling function whenever component is loaded
   
   useEffect(()=>{
        if(token)
        {
          fetchOrders();
        }
   },[token])



  return (
    // diplaying power data
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return(
            // index will be got through parameters
            <div key={index} className="my-orders-order">
             <img src={assets.parcel_icon}alt="" />
             <p>{order.items.map((item,index)=>{
              //displaying last item,don't have comma on last item
                 if(index === order.items.length-1){
                     return item.name+" x "+item.quantity
                 }
                 else{
                  //displaying all items
                  return item.name+" x "+item.quantity+" , "
                 }
             })}</p>
             <p>${order.amount}.00</p>
             {/* total no. of items */}
             <p>Items:{order.items.length}</p>
             {/* code for bullet point */}
             <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button onClick={fetchOrders}>Track Order</button>
            
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
