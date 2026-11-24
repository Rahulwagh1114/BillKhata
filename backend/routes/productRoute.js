import {Router} from "express";
import { createProduct ,updateProduct ,deleteProduct } from "../controllers/productController.js";
import authMiddleware from "../middlewares/authoMiddleware.js";
const router=Router();

router.post("/products/addProduct",authMiddleware,createProduct);
router.patch("/products/update/:id",authMiddleware,updateProduct);
router.delete("/products/delete/:id",authMiddleware,deleteProduct);


export default router;