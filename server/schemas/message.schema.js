import { Schema, model, Types } from "mongoose";

const Message = new Schema(
  {
    usersId: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
      key: "_id",
    },
    vidyoId: {
      type: Types.ObjectId,
      required: true,
      ref: "vidyo",
      key: "_id",
    },
    messageLiked: {
      type: [Types.ObjectId],
      required: true,
      ref: "users",
      key: "_id",
    },
    messageDontLiked: {
      type: [Types.ObjectId],
      required: true,
      ref: "users",
      key: "_id",
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: {
      updatedAt: "come_date",
      createdAt: "created_at",
    },
  }
);

export default model("message", Message);
