import { User, Profile } from "../models/index.js";
import { createJwtToken } from "../utils/jwtCreator.js";
import { hash } from "bcrypt";
import { config } from "../../config.js";

export async function getUser(req, res) {
  try {
    const id = req.params.id;

    await validateUserProfile(id, req, res);

    const result = await Profile.findOne({ user: id }).populate(
      "user",
      "email role"
    );
    res.status(200).json({ profile: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}

export async function registerUser(req, res) {
  try {
    const { user, profile } = req.body;

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
      .send({
        token,
        userId: savedUser.id,
        email: savedUser.email,
        role: savedUser.role,
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const id = req.params.id;
    await validateUserProfile(id, req, res);
    let { profile } = req.body;
    profile = await Profile.findOneAndUpdate({ user: id }, profile, {
      new: true,
    }).populate("user", "email role");
    res.status(200).json({ profile });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}

export async function removeUser(req, res) {
  try {
    const id = req.params.id;

    await validateUserProfile(id, req, res);

    await Profile.findOneAndDelete({ user: id });
    await User.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}

async function validateUserProfile(id, req, res) {
  try {
    const profile = await Profile.findOne({ user: id });
    const user = await User.findById({ _id: id });
    if (!profile) {
      return res.status(404).json({ message: `UserProfile not found: ${id}` });
    }
    if (!user) {
      return res.status(404).json({ message: `User not found: ${id}` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}
