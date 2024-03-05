import mongoose, { mongo } from "mongoose";

type UserType = {
  name: string;
  email: string;
  password: string;
  date: Date;
};

type UserLoginType = {
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 10,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = mongoose.model("User", userSchema);

export { UserModel, UserType, UserLoginType };
