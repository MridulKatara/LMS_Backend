const { Account } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const signUp = async (req, res) => {
  try {
    const { username, emailAddress, userPassword, userRole } = req.body;
    const encryptedPassword = await bcrypt.hash(userPassword, 10);
    const newUser = await Account.create({
      username,
      emailAddress,
      userPassword: encryptedPassword,
      userRole,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { emailAddress, userPassword } = req.body;
    const account = await Account.findOne({ where: { emailAddress } });
    if (!account || !(await bcrypt.compare(userPassword, account.userPassword))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const authToken = jwt.sign(
      { id: account.id, userRole: account.userRole },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ authToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signUp, signIn };
