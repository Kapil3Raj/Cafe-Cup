import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cartItems: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item',
        },
        name: String,
        price: Number,
        qty: Number,
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    billNumber: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true }
);

const Bill = mongoose.model('Bill', billSchema);

export default Bill;
