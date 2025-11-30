import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    linkedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
