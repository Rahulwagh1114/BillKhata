import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessLogin",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: [
      {
        product: { type: String, trim: true, required: true },
        qty: { type: Number, min: 0, default: 1 },
        rate: { type: Number, min: 0, default: 0 },
        amount: { type: Number, min: 0, required: true },
      },
    ],
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0.01 },
    paymentStatus: {
      type: String,
      enum: ["paid", "partial", "unpaid"],
      required: true,
    },
    amountPaid: { type: Number, default: 0, min: 0 },
    dueDate: { type: Date, default: null },
    notes: { type: String, trim: true, default: "" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

invoiceSchema.virtual("dueAmount").get(function () {
  return Math.max(this.totalAmount - this.amountPaid, 0);
});

invoiceSchema.index({ owner: 1, customer: 1, createdAt: -1 });

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;