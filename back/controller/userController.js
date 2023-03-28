const {
  createUser,
  findUser,
  confirmUser,
  updateUserById,
  generateToken,
  checkToken,
  updatePassword,
} = require("../models/userModel");
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
      // A changer
      await sendEmail(email, "John", 1);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: code.HTTPCode.user.ERROR.register[1], msg: error });
  }
};

const login = async (req, res) => {
  const { email, password } = await req.body;

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

const updateUser = async (req, res) => {
  const { id } = await req.params;
  const { name, lastname, address, phone, zip, city, country, cgv, img } =
    await req.body;
  try {
    const result = await updateUserById(
      id,
      name,
      lastname,
      address,
      phone,
      zip,
      city,
      country,
      cgv,
      img
    );
    res.status(201).json({
      message: code.HTTPCode.user.SUCCESS.update.SUCCESS,
      user: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: code.HTTPCode.user.SUCCESS.update.ERROR });
  }
};

const resetPassword = async (req, res) => {
  const { email } = await req.body;
  try {
    const response = await findUser(email);

    if (response.length === 0) {
      return res
        .status(404)
        .json({ message: "Cet e-mail ne correspond à aucun utilisateur." });
    }
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const result = await generateToken(email, token);
    console.log(result);

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await sendEmail(email, "John", 2, resetLink);
    res.status(201).json({ message: "Un email vous a été envoyé" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Email not sent", msg: error });
  }
};

const confirmResetPassword = async (req, res) => {
  const { token } = await req.params;
  const { password } = await req.body;

  try {
    const result = await checkToken(token);

    if (result.length === 0) {
      return res.status(400).json({
        msg: "Le jeton de réinitialisation de mot de passe est invalide ou a expiré.",
      });
    }
    const response = await updatePassword(token, password);
    console.log(response);

    res.status(500).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: "Erreur password updated" });
  }
};

module.exports = {
  registerUser,
  login,
  confirmAccount,
  updateUser,
  resetPassword,
  confirmResetPassword,
};
