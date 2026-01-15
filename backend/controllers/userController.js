// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// // VIEW: list all users except admin
// exports.listForView = async (req, res) => {
//   try {
//     const users = await User.find({ role: { $ne: "admin" } }).select("-password");
//     return res.json(users);
//   } catch (err) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// exports.updateMyProfile = async (req, res) => {
//   try {
//     const updates = {};
//     if (req.body.name !== undefined) updates.name = req.body.name;
//     if (req.body.profileImage !== undefined) updates.profileImage = req.body.profileImage;

//     const updated = await User.findByIdAndUpdate(req.user._id, updates, { new: true })
//       .select("-password");

//     return res.json({ message: "Profile updated", user: updated });
//   } catch (err) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };
// exports.adminEditUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, role, profileImage } = req.body;

//     // Cannot assign admin
//     if (role === "admin") {
//       return res.status(403).json({ message: "Cannot assign admin role" });
//     }

//     // Ensure target is not admin
//     const target = await User.findById(id);
//     if (!target) return res.status(404).json({ message: "User not found" });
//     if (target.role === "admin") {
//       return res.status(403).json({ message: "Cannot edit admin" });
//     }

//     const updated = await User.findByIdAndUpdate(
//       id,
//       { name, role, profileImage },
//       { new: true }
//     ).select("-password");

//     return res.json({ message: "Updated", user: updated });
//   } catch (err) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };
// exports.adminDeleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const target = await User.findById(id);
//     if (!target) return res.status(404).json({ message: "User not found" });

//     if (target.role === "admin") {
//       return res.status(403).json({ message: "Cannot delete admin" });
//     }

//     await User.findByIdAndDelete(id);
//     return res.json({ message: "User deleted" });
//   } catch (err) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // USER/ADMIN/VIEW: get own profile
// exports.getMyProfile = async (req, res) => {
//   return res.json(req.user);
// };

// // ADMIN: create user
// exports.adminCreateUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (role === "admin") {
//       return res.status(403).json({ message: "Cannot create admin from here" });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) return res.status(409).json({ message: "Email already exists" });

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashed,
//       role: role || "user",
//     });

//     return res.status(201).json({
//       message: "User created",
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };


const bcrypt = require("bcryptjs");
const User = require("../models/User");

// List all users except admin (for user + admin)
exports.listForView = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select("-password");
    return res.json(users);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getMyProfile = async (req, res) => res.json(req.user);

exports.updateMyProfile = async (req, res) => {
  try {
    const updates = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.profileImage !== undefined) updates.profileImage = req.body.profileImage;

    const updated = await User.findByIdAndUpdate(req.user._id, updates, { new: true })
      .select("-password");

    return res.json({ message: "Profile updated", user: updated });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.adminCreateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (role === "admin") return res.status(403).json({ message: "Cannot create admin from here" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "user",
    });

    return res.status(201).json({
      message: "User created",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.adminEditUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, profileImage } = req.body;

    const target = await User.findById(id);
    if (!target) return res.status(404).json({ message: "User not found" });

    // block editing another admin (keeps "admin cannot edit admin")
    if (target.role === "admin") {
      return res.status(403).json({ message: "Cannot edit admin" });
    }

    // allow only valid roles
    const allowedRoles = ["user", "view", "admin"];
    if (role !== undefined && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (role !== undefined) updates.role = role;
    if (profileImage !== undefined) updates.profileImage = profileImage;

    const updated = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    return res.json({ message: "Updated", user: updated });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};


exports.adminDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const target = await User.findById(id);
    if (!target) return res.status(404).json({ message: "User not found" });

    if (target.role === "admin") return res.status(403).json({ message: "Cannot delete admin" });

    await User.findByIdAndDelete(id);
    return res.json({ message: "User deleted" });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};
