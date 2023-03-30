const {
  addToBasket,
  deleteItemFromBasket,
  deleteAllBasket,
  getBasket,
  updateQuantity,
} = require("../models/basketModel");

const AddToBasket = async (req, res) => {
  const { user_id, product_id, quantity } = await req.body;

  try {
    const result = await addToBasket(user_id, product_id, quantity);
    return res
      .status(201)
      .json({ message: "User Add to Basket Done", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
const UpdateQuantity = async (req, res) => {
  const { product_id, quantity } = await req.body;

  try {
    const result = await updateQuantity(quantity, product_id);
    return res
      .status(201)
      .json({ message: "Update Quantity Basket Done", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
const GetBasket = async (req, res) => {
  const { user_id } = await req.body;

  try {
    const result = await getBasket(user_id);

    return res.status(201).json({ message: "User Basket Get", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
const DeleteItemFromBasket = async (req, res) => {
  const { product_id, user_id } = await req.body;

  try {
    const result = await deleteItemFromBasket(product_id, user_id);

    return res
      .status(201)
      .json({ message: "Item User purchases Delete", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
const DeleteAllBasket = async (req, res) => {
  const { user_id } = await req.body;

  try {
    const result = await deleteAllBasket(user_id);

    return res
      .status(201)
      .json({ message: "User purchases All Delete", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
module.exports = {
  AddToBasket,
  DeleteItemFromBasket,
  DeleteAllBasket,
  GetBasket,
  UpdateQuantity,
};
