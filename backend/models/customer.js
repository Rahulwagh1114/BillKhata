import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessLogin",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      // keep only the last 10 digits (removes spaces, +91, dashes)
      set: (value) => String(value).replace(/\D/g, "").slice(-10),
      match: [/^\d{10}$/, "Please enter a valid 10 digit mobile number"],
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    totalAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// pending is never stored, it is always calculated
customerSchema.virtual("pendingAmount").get(function () {
  return Math.max(this.totalAmount - this.paidAmount, 0);
});

// mobile is unique per business, not across the whole database
customerSchema.index({ owner: 1, mobile: 1 }, { unique: true });

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;