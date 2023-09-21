import { Schema, model, Types } from "mongoose";

const Addmin = new Schema(
  {
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      email: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      updatedAt: "come_date",
      createdAt: "created_at",
    },
  }
);

export default model("addmin", Addmin);
