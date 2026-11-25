import { Router } from "express";
import authMiddleware from "../middlewares/authoMiddleware.js";
import { createInvoice,getCustomerInvoices,getInvoicesAll } from "../controllers/invoiceController.js";

const router = Router();
router.post("/invoice/create", authMiddleware, createInvoice);
router.get("/customer/:id/invoices", authMiddleware, getCustomerInvoices);
router.get("/invoicesAll",authMiddleware,getInvoicesAll);
export default router;