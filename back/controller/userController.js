const { createUser, findUser, confirmUser } = require("../models/userModel");
const { sendEmail } = require("../mailling/sendinblue");
const bcrypt = require("bcryptjs");
const code = require("../HttpResponse/httpResponse");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  const { email, password } = await req.body;
  try {
    const response = await findUser(email);
    if (response.length > 0) {
      res.status(409).json({
        message: code.HTTPCode.user.ERROR.register[0],
      });
    } else {
      const result = await createUser(email, password);
      res.status(201).json({
        message: code.HTTPCode.user.SUCCESS.register[0],
        userId: result.insertId,
        data: result,
      });
      await sendEmail(email, "John");
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: code.HTTPCode.user.ERROR.register[1], msg: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await findUser(email);
    if (result.length === 0) {
      res.status(400).json({ message: code.HTTPCode.user.ERROR.login[0] });
    } else {
      const isMatch = bcrypt.compare(password, result[0].password);
      if (isMatch) {
        const user = {
          id: result[0].id,
          email: result[0].email,
        };
        const token = createToken(result[0].id);
        if (result[0].confirmed !== 1) {
          res.status(401).json({ message: code.HTTPCode.user.ERROR.login[3] });
          return;
        }
        res.status(201).json({
          message: code.HTTPCode.user.SUCCESS.login[0],
          user: user,
          token: token,
        });
      } else {
        res.status(404).json({ message: code.HTTPCode.user.ERROR.login[1] });
      }
    }
  } catch (error) {
    res.status(500).json({ error: code.HTTPCode.user.ERROR.login[2] });
  }
};

const confirmAccount = async (req, res) => {
  const { email } = await req.params;
  try {
    await confirmUser(email);
    res.redirect("http://localhost:3000");
  } catch (error) {
    console.error(code.HTTPCode.user.ERROR.register[2], error);
    res.status(500).json({ message: code.HTTPCode.user.ERROR.register[2] });
  }
};

const testRequireAuth = async (req, res) => {
  const { email } = await req.body;
  try {
    console.log(email);
    const id = await findUser(email);
    console.log();
    res.status(500).json({ message: "PROTECTED", id: id[0].id });
  } catch (error) {
    console.error(code.HTTPCode.user.ERROR.register[2], error);
    res.status(500).json({ message: code.HTTPCode.user.ERROR.register[2] });
  }
};
module.exports = {
  registerUser,
  login,
  confirmAccount,
  testRequireAuth,
};
