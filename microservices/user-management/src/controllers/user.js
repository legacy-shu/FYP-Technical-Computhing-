import { User, Profile } from "../models/index.js";
import { createJwtToken } from "../utils/jwtCreator.js";
import { hash } from "bcrypt";
import { config } from "../../config.js";

export async function getUser(req, res) {
  try {
    const id = req.params.id;
    const result = await Profile.findOne({ _id: id }).populate(
      "user",
      "email role"
    );
    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}

export async function registerUser(req, res) {
  try {
    const { user } = req.body;
    const { profile } = req.body;

    //check existing user email
    const found = await User.findOne({ email: user.email });
    if (found) {
      return res.status(409).json({ message: `${user.email} already exists` });
    }

    //replace hashed password
    const hashed = await hash(user.password, config.bcrypt.saltRounds);
    user.password = hashed;

    //save user and profile
    const savedUser = await new User(user).save();
    profile.user = savedUser.id;
    const savedProfile = await new Profile(profile).save();

    //create new token by user's info
    const token = await createJwtToken({
      email: savedUser.email,
      role: savedUser.role,
      id: savedUser.id,
    });

    res
      .status(201)
      .send({ user: savedUser, profile: savedProfile, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}

export async function updateUser(req, res, next) {
  res.status(200).json({ message: "User Management Service" });
}

export async function removeUser(req, res, next) {
  res.status(200).json({ message: "User Management Service" });
}
