import { Router } from "express";
import authMiddleware from "../middlewares/authoMiddleware.js";
import { addCustomer,deleteCustomer,editCustomer,getAllCustomers,getOneCustomer } from "../controllers/customer.js";
const router=Router();

router.get("/customer/",authMiddleware,getAllCustomers)
router.post("/customer/addCustomer",authMiddleware,addCustomer);
router.patch("/customer/edit/:id",authMiddleware,editCustomer)
router.delete("/customer/delete/:id",authMiddleware,deleteCustomer)
router.get("/customer/:id",authMiddleware,getOneCustomer)

export default router;