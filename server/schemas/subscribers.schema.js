import { Schema, model, Types } from "mongoose";

const Subscribers = new Schema(
  {
    usersId: {
      type: Types.ObjectId,
      default: [],
      required: true,
      ref: "users",
      key: "_id",
    },
    subscribers: {
      type: [Types.ObjectId],
      default: [],
      ref: "users",
      key: "_id",
    },
    subscribersMe: {
      type: [Types.ObjectId],
      default: [],
      ref: "users",
      key: "_id",
    },
  },
  {
    timestamps: {
      updatedAt: "updated_at",
      createdAt: "created_at",
    },
  }
);

export default model("subscribers", Subscribers);
