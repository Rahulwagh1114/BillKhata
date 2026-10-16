import { Router } from "express";
import { registerBusiness,loginToBusiness,logoutFromAll,refreshToken } from "../controllers/businessLogin.js";
const router = Router();
 import authMiddleware from "../middlewares/authoMiddleware.js";
router.post("/register",registerBusiness);
router.post("/login",loginToBusiness);
router.get("/logout",authMiddleware,logoutFromAll);
router.post("/refresh", refreshToken);

export default router;