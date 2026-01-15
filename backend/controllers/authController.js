const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Public signup: admin not allowed
    if (role === "admin") {
      return res.status(403).json({ message: "Admin signup not allowed" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
      role: role || "user",
    });

    return res.status(201).json({ message: "Signup success" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage || "",
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.me = async (req, res) => {
  return res.json(req.user);
};
