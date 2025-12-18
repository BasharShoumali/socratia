import User from "../models/User.js";
import bcrypt from "bcryptjs";

/*register function, checks if there's a duplicate email or username
if no duplicates, it creates a new user, if yes it returns an error*/
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

/*the login function makes it easy for the user to login with email or username
and password*/

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    email = String(email).trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const validPass = await bcrypt.compare(password, user.passwordHash);
    if (!validPass) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const safeUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phone: user.phone,
    };

    return res
      .status(200)
      .json({ message: "Login successful", user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
