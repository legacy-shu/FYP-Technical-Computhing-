import { User } from "../models/index.js";
import { compare } from "bcrypt";
import { createJwtToken } from "../utils/jwtCreator.js";

export async function check(req, res) {
  const user = await User.findById(req.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token });
}

export async function login(req, res) {
  const { user } = req.body;
  const { email, password } = user;

  //check exist user or not first
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  //check password correct or not
  const isValidPassword = await compare(password, foundUser.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }

  const token = await createJwtToken({
    email: user.email,
    role: user.role,
    id: user.id,
  });

  res.status(200).json({ token, foundUser });
}
