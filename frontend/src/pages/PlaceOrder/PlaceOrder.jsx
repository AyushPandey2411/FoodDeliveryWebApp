import React, { useContext, useEffect, useState} from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {

  // using context api for mounting total cart amount
  
  //adding token,food_list for payment
  const{getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);

  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pincode:"",
    country:"",
    phone:""
  })

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder=async(event)=>{
     event.preventDefault();
     //api
     let orderItems=[];
     food_list.map((item)=>{
          if(cartItems[item._id]>0)
          {
            let itemInfo=item;
            itemInfo["quantity"]=cartItems[item._id];
            orderItems.push(itemInfo)
          }
     })
    //  console.log(orderItems)

    //order data variable
    let orderData={
         address:data,
         items:orderItems,
         amount:getTotalCartAmount()+2,
    }
    //api calling-    Kaand
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});

     //checking response
    if(response.data.success)
    {
      const {session_url}=response.data;
      //sending user on session url:
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }

  }

 const navigate=useNavigate();


  //order page visible only after login
  useEffect(()=>{
       if(!token)
       {
        navigate('/cart')
       }
       else if (getTotalCartAmount()===0)
       {
         navigate('/cart')
       }
  },[token])

 

  //name,onchange,value added to following after payment
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
      {/* added required to first filling up of form then using button to submit */}
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input  required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input  required name='pincode' onChange={onChangeHandler} value={data.pincode} type="text" placeholder='PIN Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' />
      </div>
      <div className="place-order-right">

      {/* copy from cart page */}

      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
         
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
          </div>
          
        </div>
        <button type='submit'>Proceed to payment</button>
      </div>
      </div>
    </form>
  )
}

export default PlaceOrder
