import { getRecommendations } from "../utils/recommendation.js";

export const recommendProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const recommendations = await getRecommendations(productId);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
