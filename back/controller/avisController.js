const {
  createAvis,
  getAllAvisByProductId,
  getAllAvisByProductUserId,
  updateAvis,
  deleteAvis,
} = require("../models/avisModel");

const createSingleAvis = async (req, res) => {
  const { name, rank, description, user_id, product_id } = await req.body;

  try {
    const result = await createAvis(
      name,
      rank,
      description,
      user_id,
      product_id
    );

    res.status(200).json({ message: "Customer feedback Add", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const getAvisByProductId = async (req, res) => {
  const { product_id } = await req.params;

  try {
    const result = await getAllAvisByProductId(product_id);
    if (result.length === 0) {
      return res.status(404).json({ message: "No data found for this entry " });
    }
    res.status(200).json({ message: "Customer feedback Add", data: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getAvisByProductUserId = async (req, res) => {
  const { user_id } = await req.params;

  try {
    const result = await getAllAvisByProductUserId(user_id);
    if (result.length === 0) {
      return res.status(404).json({ message: "No data found for this entry " });
    }
    res.status(200).json({ message: "Customer feedback Add", data: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateSingleAvis = async (req, res) => {
  const { id } = await req.params;
  const { name, rank, description } = await req.body;

  try {
    const result = await updateAvis(id, name, rank, description);

    res.status(200).json({ message: "Customer feedback Update", data: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteSingleAvis = async (req, res) => {
  const { id } = await req.params;

  try {
    await deleteAvis(id);

    res.status(200).json({ message: "Customer feedback Deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
module.exports = {
  createSingleAvis,
  getAvisByProductId,
  getAvisByProductUserId,
  updateSingleAvis,
  deleteSingleAvis,
};
