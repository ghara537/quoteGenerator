import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose, { ConnectOptions, MongooseError } from "mongoose";
import { UserModel, UserType, UserLoginType } from "../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import quotesJSONArray from "../quotesSource.json";
import verify from '../routes/auth';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect((process.env.DB_CONNECT ??= "")).catch((error) => {
  console.log(error);
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const createAccessToken = (email: string) => {
  let tokenUser = { email: email };
  return jwt.sign(tokenUser, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: "2m"});
};

app.get("/quotes/all", verify, (req, res) => {
  //authenticate user
  res.send({quotesList: quotesJSONArray});
})

app.get("/quotes/random", (req, res) => {
  //authenticate user
  const randomNumber = Math.floor(Math.random() * quotesJSONArray.length);
  const quote = quotesJSONArray[randomNumber];
  res.send(quote);
});

app.post("/createUserPage/createUser", async (req, res) => {
  //check if user exists
  console.log(JSON.stringify(req.body));
  const userExists = await UserModel.find({ email: req.body.user.email });
  if (userExists.length !== 0) {
    res.send("Username already exists.  Please select another");
  } else {
    const addedUser = await UserModel.create({
      name: req.body.user.name,
      email: req.body.user.email,
      password: await bcrypt.hash(req.body.user.password, 10),
      date: Date.now(),
    });
    const accessToken = createAccessToken(addedUser.email);
    res
      .header("auth-token", accessToken)
      .send(`User Successfully Added\n\n token: ${accessToken}`);
  }
});

app.post("/login", async (req, res) => {
  console.log(JSON.stringify(req.body));
  const UserExists = await UserModel.find({ email: req.body.user.email });
  if (UserExists.length === 0) {
    console.log("Username could not be found");
    res.send("Issue Logging in. Please try again");
  } else {
    if (bcrypt.compareSync(req.body.user.password, UserExists[0].password)) {
      //successful sign in, provide JWT
      const accessToken = createAccessToken(UserExists[0].email);
      res.header("auth-token", accessToken).send({ token: accessToken });
    } else {
      console.log(`Incorrect Password entered for ${req.body.user.email}`);
      res.send("Issue Logging in. Please try again");
    }
  }
});

app.get("/", async (req, res) => {
  console.log("You've made it");
  try {
    const testUser = await UserModel.find();
    console.log(JSON.stringify(testUser));
  } catch (err) {
    console.log(err);
  }
  res.send("Welcome!");
});

app.listen(port, () => {
  console.log(`Application is listening on http://localhost:${port}`);
});
