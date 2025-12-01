import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// creating use schema
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, "Fullname is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    avatar: {
      type: string,
      required: true,
    },
    coverImage: {
      type: string,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//Pre hook - Hash password before saving
// used bcrypt library
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method - check if the password is correct or not
userSchema.methods.ispasswordCorrect = async function (clientPassword) {
  return await bcrypt.compare(clientPassword, this.password); //returns boolean
};

// method - generating access & refresh token which we will send with every req from client side after loggin in to avoid log in again & again (in every request).
// This is a short lived token.
// We are usniig jwt which is a singed token.
// It has three parts header , payload & signature.
// we craete it using .sign() & decode it using .decode(token).
userSchema.methods.generateAccessToken = async function () {
  const payload = {
    id: this._id,
    userName: this.userName,
    email: this.email,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

//  We will save this token in our db because this is a long lived token 
// Using this token we will refresh our accesstoken when it expires 
userSchema.methods.generateRefreshToken = async function () {
  const payload = {
    id: this._id,
    userName: this.userName,
    email: this.email,
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

// In the mongoDB the mongoose is going to create a document with this structure
// The name of teh document is User and the sturcture which is being followed id userSchema
export const User = mongoose.model("User", userSchema);
