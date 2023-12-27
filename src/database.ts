import mongoose from "mongoose";

const DB_URI = "mongodb://localhost:27017/expense-record-api";

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Correct DB Connect");
  })
  .catch((error) => {
    console.error("DB Error:", error);
  });
