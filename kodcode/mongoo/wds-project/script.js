import mongoose from "mongoose";
import userModule from "./user.js";

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("Connected to mongoDB!"))
  .catch((e) => console.log("Error connecting to MongoDB! ", e));

const run = async () => {
  try {
    //   const user = new userModule({ name: "Kyle", age: 26 });
    //   await user.save()
    const user = await userModule.create({
      name: "Kyle",
      age: {
        type: Number,
        max: 120,
        min: 1,
      },
      email: "yawiezel@gmail.com",
      createdAt: new Date(),
      updateAt: Date.now(),
      hobbies: ["Weight Lifting", "Bowling"],
      address: {
        street: "eli 19",
        city: "bene brake",
      },
    });
    user.createdAt = 5;
    await user.save();
    console.log(user);
  } catch (error) {
    console.log("1", error.message);
    // console.log("2", error.errors.age);
  }
};

run();
