import { Schema, model, Types } from "mongoose";

const VidyoSee = new Schema(
  {
    usersId: {
      type: Types.ObjectId,
      default: [],
      required: true,
      ref: "users",
      key: "_id",
    },
    vidyoSee: {
      type: [Types.ObjectId],
      default: [],
      ref: "vidyo",
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

export default model("vidyosee", VidyoSee);
