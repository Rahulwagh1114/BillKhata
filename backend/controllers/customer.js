import mongoose from "mongoose";
import Customer from "../models/customer.js";

// ek jaisa error handling sab functions ke liye
const handleError = (error, res) => {
  // duplicate mobile (same business me)
  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Customer with this mobile number already exists",
    });
  }

  // mongoose validation error (invalid mobile, missing field etc.)
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((e) => e.message)
      .join(", ");
    return res.status(400).json({ success: false, message });
  }

  // galat id format
  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid customer id",
    });
  }

  console.log(error);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

// Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({
      owner: req.businessLoginId,
      isActive: true,
    });

    return res.status(200).json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// Add new customer
export const addCustomer = async (req, res) => {
  try {
    const { name, mobile, address } = req.body;

    if (!name || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Name and mobile are required",
      });
    }

    const customer = new Customer({
      owner: req.businessLoginId,
      name,
      mobile,
      address,
    });

    await customer.save();

    return res.status(201).json({
      success: true,
      message: "Customer added successfully",
      customer,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// Get one customer
export const getOneCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer id",
      });
    }

    const customer = await Customer.findOne({
      _id: id,
      owner: req.businessLoginId,
      isActive: true,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// Edit customer (sirf name, mobile, address)
export const editCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer id",
      });
    }

    const customer = await Customer.findOne({
      _id: id,
      owner: req.businessLoginId,
      isActive: true,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // owner, totalAmount, paidAmount body se change nahi honge
    const { mobile, address } = req.body;
    if (mobile !== undefined) customer.mobile = mobile;
    if (address !== undefined) customer.address = address;

    // save() se setter aur validators dono chalte hain
    await customer.save();

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// Delete customer (soft delete)
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer id",
      });
    }

    const customer = await Customer.findOneAndUpdate(
      { _id: id, owner: req.businessLoginId, isActive: true },
      { isActive: false },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    return handleError(error, res);
  }
};