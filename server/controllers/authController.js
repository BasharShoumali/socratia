import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    let { firstName, lastName, username, phone, email, password } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Normalize
    email = String(email).trim().toLowerCase();
    username = String(username).trim().toLowerCase();

    // check if email or username already exists
    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const usernameTaken = await User.findOne({ username });
    if (usernameTaken) {
      return res.status(409).json({ message: "Username already in use" });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // create user
    try {
      const user = await User.create({
        firstName,
        lastName,
        username,
        phone,
        email,
        passwordHash,
      });

      // return safe user info
      const safeUser = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      };

      return res
        .status(201)
        .json({ message: "User registered", user: safeUser });
    } catch (saveErr) {
      // handle duplicate key error (race condition)
      if (saveErr && saveErr.code === 11000) {
        const field = saveErr.keyValue
          ? Object.keys(saveErr.keyValue)[0]
          : "field";
        return res.status(409).json({ message: `${field} already in use` });
      }
      throw saveErr;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
