const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  try {
    const { fullName, userName, email, password, gender, dob, country } = req.body;
    

    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = new User({ fullName, userName, email, password, gender, dob, country });
    await user.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error: error.message });
  }
};

const loginUser = async (req, res) => {
    try {
      const { identifier, password } = req.body; 
  
      const user = await User.findOne({
        $or: [{ userName: identifier }, { email: identifier }],
      });
  
      if (!user || !user.comparePassword(password)) {
        return res.status(401).json({ message: "Invalid username/email or password" });
      }
  
      const token = generateToken(user);
  
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          userName: user.userName,
          email: user.email,
          gender: user.gender,
          dob: user.dob,
          country: user.country,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal error", error: error.message });
    }
  };
  

const searchUser = async (req, res) => {
  try {
    const { email, userName } = req.query;
    const query = {};

    if (email) query.email = email;
    if (userName) query.userName = userName;

    const users = await User.find(query).select("-password");
    res.status(200).json({ message: "Users found", users });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, searchUser };
