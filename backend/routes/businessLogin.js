import { Router } from "express";
import { registerBusiness,loginToBusiness,logoutFromAll } from "../controllers/businessLogin.js";
const router = Router();
 import authMiddleware from "../middlewares/authoMiddleware.js";
router.post("/register",registerBusiness);
router.post("/login",loginToBusiness);
router.get("/logout",authMiddleware,logoutFromAll);

export default router;