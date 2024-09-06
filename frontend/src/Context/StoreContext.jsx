import { createContext ,useEffect,useState} from "react";
import axios from "axios"
// not using imported foodlist after fetching data directly from 
// import { food_list } from "../assets/assets";

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{

    const[cartItems,setCartItems]=useState({});
    const url="http://localhost:4000"

    const [token,setToken]=useState("")

     //fetching food data on frontend from Database
     const[food_list,setFoodList]=useState([])

     //adding async to make await work("for backend api integration")
    const addToCart= async(itemId)=>{
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}))

        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        //after backend api creation:
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeFromCart=async(itemId)=>{
       
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token)
        {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
            // to check item is available in the cart
            let itemInfo=food_list.find((product)=>product._id===item);
            totalAmount +=itemInfo.price*cartItems[item];
            }
            
        }
        return totalAmount;

    }
   
    //fetching food data
    const fetchFoodList=async()=>{
         const response=await axios.get(url+"/api/food/list");
         setFoodList(response.data.data)
    }
   
    //Refresh:Cart empty problem
    const loadCartData=async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }


   //Avoiding logout after refreshing
    useEffect(()=>{
        //for fetching food list
        async function loadData()
        {
            await fetchFoodList();

            if(localStorage.getItem("token"))
                {
                    //provide the token
                    setToken(localStorage.getItem("token"));
                   //calling function to get cart when page loaded
                    await loadCartData(localStorage.getItem("token"))
                
                }

        }
        loadData();
    },[])

    const contextValue={
          food_list,
          cartItems,
          setCartItems,
          addToCart,
          removeFromCart,
          getTotalCartAmount,
          url,
          token,
          setToken,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider