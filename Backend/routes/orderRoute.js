import express from "express"
import authMiddleware from "../middleware/auth.js"

import { listOrders, placeOrder, updateStatus, userOrders,verifyOrder } from "../controllers/orderController.js"

const orderRouter=express.Router();

//endpoint
//for payment,placing order
orderRouter.post("/place",authMiddleware,placeOrder);

//for verifyig order:
orderRouter.post("/verify",verifyOrder)

//for userOrder
orderRouter.post("/userorders",authMiddleware,userOrders)
//for getting order in admin panel
orderRouter.get('/list',listOrders);
//for updating order status
orderRouter.post("/status",updateStatus)



export default orderRouter;