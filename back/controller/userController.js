const {
  createUser,
  findUser,
  confirmUser,
  updateUserById,
  generateToken,
  checkToken,
  updatePassword,
  findUserById,
  updateImg,
} = require("../models/userModel");
const { sendEmail } = require("../mailling/sendinblue");
const path = require("path");

const bcrypt = require("bcryptjs");
const code = require("../HttpResponse/httpResponse");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  const { email, password, name, lastname } = await req.body;
  try {
    if (!email || !password || !name || !lastname)
      return res.status(409).json({
        message: "Veuillez remplir les champs néccesaire",
      });
    const response = await findUser(email);
    if (response.length > 0) {
      res.status(409).json({
        message: code.HTTPCode.user.ERROR.register[0],
      });
    } else {
      const result = await createUser(email, password, name, lastname);
      res.status(201).json({
        message: code.HTTPCode.user.SUCCESS.register[0],
        user: result.insertId,
        data: result,
      });
      // A changer
      await sendEmail(email, name, 1, "", result.insertId);
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
      return res
        .status(400)
        .json({ message: code.HTTPCode.user.ERROR.login[0] });
    }
    const isMatch = await bcrypt.compare(password, result[0].password);
    if (isMatch) {
      const user = {
        id: result[0].id,
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
  } catch (error) {
    res.status(500).json({ error: code.HTTPCode.user.ERROR.login[2] });
  }
};

const confirmAccount = async (req, res) => {
  const { id } = await req.params;
  try {
    await confirmUser(id);
    res.redirect("http://localhost:3000");
  } catch (error) {
    console.error(code.HTTPCode.user.ERROR.register[2], error);
    res.status(500).json({ message: code.HTTPCode.user.ERROR.register[2] });
  }
};

const updateUser = async (req, res) => {
  const { id } = await req.params;
  const { name, lastname, address, phone, zip, city, country, cgv } =
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
      cgv
    );
    console.log(result);
    res.json({
      message: code.HTTPCode.user.SUCCESS.update.SUCCESS,
      status: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: code.HTTPCode.user.SUCCESS.update.ERROR });
  }
};
const updateUserImg = async (req, res) => {
  const { id } = req.params;
  try {
    const Myimage = req.file;
    console.log(Myimage);
    const url = "http://" + req.headers.host;
    const image = Myimage.path.replace(/^\/+/, "").replace(/\\/g, "/");
    const imageUrl = `${url}/uploads/${Myimage.filename}`;
    const response = await updateImg(Myimage.filename, id);
    console.log(response, "HELLOO LA REPONS E");

    res.set("Content-Type", Myimage.mimetype);
    res.sendFile(path.resolve(__dirname, "../uploads", Myimage.filename));
    res.json({
      message: "User updated successfully",
      status: 201,
      url: imageUrl,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user." });
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

    await generateToken(email, token);

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

    res.status(201).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: "Erreur password updated" });
  }
};

const getUserFromId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await findUserById(id);
    if (result.length === 0) {
      return res.status(400).json({
        msg: "Pas d'user pour cette Id",
      });
    } else {
      const user = {
        id: result[0].id,
        name: result[0].name,
        lastname: result[0].lastname,
        email: result[0].email,
        image: result[0].image,
        phone: result[0].phone,
        address: result[0].address,
        zip: result[0].zip,
        city: result[0].city,
        country: result[0].country,
      };
      res.status(201).json({ message: "User found", user: user });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur Recup", error: error });
  }
};
module.exports = {
  registerUser,
  login,
  confirmAccount,
  updateUser,
  resetPassword,
  confirmResetPassword,
  getUserFromId,
  updateUserImg,
};
