import { Schema, model, Types } from "mongoose";
const Vidyo = new Schema(
  {
    vidyoLink: {
      type: String,
      require: true,
    },
    usersId: {
      type: Types.ObjectId,
      ref: "users",
      key: "_id",
    },
    vidyoTitel: {
      type: String,
    },
    vidyoLiked: {
      type: [Types.ObjectId],
      required: true,
      ref: "users",
      key: "_id",
      default: [],
    },
    vidyoDontLiked: {
      type: [Types.ObjectId],
      required: true,
      ref: "users",
      key: "_id",
      default: [],
    },
    vidyoSee: {
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

export default model("vidyo", Vidyo);
