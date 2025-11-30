import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
  subscriber: {
    type: Schema.Types.ObjectId,  // one who us subscribing
    ref: "User",
  },
  channle: {
    type: Schema.Types.ObjectId, // one to whom subscriber is subscribing
    ref: "User",
  },
} , {timestamps : true});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
