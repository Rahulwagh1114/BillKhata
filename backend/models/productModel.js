import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessLogin",
      required: true,
    },
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
    unit: {
      type: String,
      enum: ["pcs", "kg", "litre", "box", "bag", "meter", "dozen"],
      default: "pcs",
    },
    rate: {
      type: Number,
      required: [true, "Rate is required"],
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    gst: {
      type: Number,
      enum: [0, 5, 12, 18, 28],
      default: 0,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
  },
  { timestamps: true }
);

// product name is unique per business, not across the whole database
productSchema.index({ owner: 1, productName: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);

export default Product;