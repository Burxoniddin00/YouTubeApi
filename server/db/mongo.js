import mongoose from "mongoose";
mongoose
  .connect(
    "mongodb+srv://burxstvoldi:burx1234@cluster0.wmplisq.mongodb.net/"
  )
  .then(console.log("connection"))
  .catch((er) => console.log(er.message));
