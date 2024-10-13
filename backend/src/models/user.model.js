import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    minLength: [3, "Username must caontain at least 3 characters."],
  },
  password: {
    type: String,
    selected: false,
    minLength: [8, "Password must contain at least 8 characters."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowecase: true,
    trim: true,
    index: true, // it helps/enhance searching with this field
  },
  address: String,
  phone: {
    type: String,
    unique: true,

    minLength: [10, "Phone Number must caontain exact 10 digits."],
    maxLength: [10, "Phone Number must caontain exact 10 digits."],
  },
  profileImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  paymentMethods: {
    bankTransfer: {
      bankAccountNumber: String,
      bankAccountName: String,
      bankName: String,
    },
    upi: {
      upiMobileNumber: Number,
    },
    paypal: {
      paypalEmail: String,
    },
  },
  role: {
    type: String,
    enum: ["Auctioneer", "Bidder", "Super Admin"],
  },
  unpaidCommission: {
    type: Number,
    default: 0,
  },
  auctionsWon: {
    type: Number,
    default: 0,
  },
  moneySpent: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
