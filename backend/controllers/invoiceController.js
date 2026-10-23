import mongoose from "mongoose";
import Customer from "../models/customer.js";
import Invoice from "../models/invoiceModel.js";
 
// paise ke float error se bachne ke liye 2 decimal tak round
const round2 = (n) => Math.round(n * 100) / 100;
 
const badRequest = (res, message) =>
  res.status(400).json({ success: false, message });
 
// Create invoice: customer nahi hai to naya banega, hai to uske amounts badhenge
export const createInvoice = async (req, res) => {
  const session = await mongoose.startSession();
 
  try {
    const {
      name,
      mobile,
      address,
      items,
      discount = 0,
      paymentStatus,
      amountPaid = 0,
      dueDate,
      notes,
    } = req.body;
 
    // ---- customer ----
    const cleanMobile = String(mobile || "").replace(/\D/g, "").slice(-10);
 
    if (!name || !String(name).trim()) {
      return badRequest(res, "Customer name is required");
    }
    if (!/^\d{10}$/.test(cleanMobile)) {
      return badRequest(res, "Please enter a valid 10 digit mobile number");
    }
 
    // ---- items: sirf product wali aur amount > 0 wali rows ----
    const cleanItems = (Array.isArray(items) ? items : [])
      .map((item) => ({
        product: String(item.product || "").trim(),
        qty: Number(item.qty) || 0,
        rate: Number(item.rate) || 0,
        amount: round2(Number(item.amount) || 0),
      }))
      .filter((item) => item.product && item.amount > 0);
 
    if (cleanItems.length === 0) {
      return badRequest(res, "Please add at least one product with an amount");
    }
 
    // ---- total server khud nikalta hai, frontend ka total nahi maanta ----
    const subtotal = round2(cleanItems.reduce((sum, item) => sum + item.amount, 0));
    const discountValue = round2(Number(discount) || 0);
 
    if (discountValue < 0 || discountValue > subtotal) {
      return badRequest(res, "Discount cannot be more than the subtotal");
    }
 
    const total = round2(subtotal - discountValue);
    if (total <= 0) {
      return badRequest(res, "Total amount must be greater than 0");
    }
 
    // ---- payment ----
    if (!["paid", "partial", "unpaid"].includes(paymentStatus)) {
      return badRequest(res, "Invalid payment status");
    }
 
    let paid = 0;
    if (paymentStatus === "paid") {
      paid = total;
    } else if (paymentStatus === "partial") {
      paid = round2(Number(amountPaid) || 0);
      if (paid <= 0 || paid >= total) {
        return badRequest(res, "For partial payment, paid amount must be more than 0 and less than the total");
      }
    }
 
    let due = null;
    if (paymentStatus !== "paid") {
      due = dueDate ? new Date(dueDate) : null;
      if (!due || Number.isNaN(due.getTime())) {
        return badRequest(res, "Please select a valid due date");
      }
    }
 
    let customer;
    let invoice;
 
    // customer ka amount aur invoice dono ek saath save hon, ya dono na hon
    await session.withTransaction(async () => {
      customer = await Customer.findOneAndUpdate(
        { owner: req.businessLoginId, mobile: cleanMobile },
        {
          // naya customer bane tabhi name/address set honge
          $setOnInsert: { name: String(name).trim(), address: address || "" },
          // purana deleted customer ho to wapas active
          $set: { isActive: true },
          $inc: { totalAmount: total, paidAmount: paid },
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true,
          session,
        }
      );
 
      [invoice] = await Invoice.create(
        [
          {
            owner: req.businessLoginId,
      customer: customer._id,
      items: cleanItems,
      subtotal,
      discount: discountValue,
      totalAmount: total,
      paymentStatus,        // ye line jodo
      amountPaid: paid,     // paidAmount ki jagah ye
      dueDate: due,
      notes: notes || "",
          },
        ],
        { session }
      );
    });
 
    return res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      invoice,
      customer,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((e) => e.message)
        .join(", ");
      return badRequest(res, message);
    }
 
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    session.endSession();
  }
};
 
// Ek customer ke saare invoices (ledger ke liye), naye pehle
export const getCustomerInvoices = async (req, res) => {
  try {
    const { id } = req.params;
 
    if (!mongoose.isValidObjectId(id)) {
      return badRequest(res, "Invalid customer id");
    }
 
    // owner bhi filter me hai, to dusre business ke customer ka data nahi milega
    const invoices = await Invoice.find({
      owner: req.businessLoginId,
      customer: id,
    }).sort({ createdAt: -1 });
 
    return res.status(200).json({
      success: true,
      count: invoices.length,
      invoices,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};