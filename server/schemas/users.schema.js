import { Schema, model, Types } from "mongoose";

const Users = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      match: /[a-zA-Z0-9]{3,15}/,
    },
    last_name: {
      type: String,
      required: true,
      match: /[a-zA-Z0-9]{3,15}/,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      email: true,
    },
    usersImgeLink: {
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

export default model("users", Users);
