import express from "express";
import Product from "../models/Product.js";  // Adjust path if needed
import natural from "natural"; // For TF-IDF
const router = express.Router();

// ✅ GET AI-based recommendations for a product
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Fetch the base product
    const baseProduct = await Product.findById(id);
    if (!baseProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2️⃣ Get all other products (exclude base product)
    const otherProducts = await Product.find({ _id: { $ne: id } });
    if (otherProducts.length === 0) {
      return res.json([]);
    }

    // 3️⃣ Build TF-IDF vectors for description similarity
    const tfidf = new natural.TfIdf();

    // Add base product + others to TF-IDF
    tfidf.addDocument(baseProduct.description);
    otherProducts.forEach((p) => tfidf.addDocument(p.description));

    // 4️⃣ Compute cosine similarity for each
    const similarities = [];
    for (let i = 0; i < otherProducts.length; i++) {
      const score = tfidf.tfidfs(baseProduct.description, i + 1); // compare with base
      similarities.push({ product: otherProducts[i], score });
    }

    // 5️⃣ Sort by score (descending) & pick top 3
    const topRecommendations = similarities
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.product);

    // 6️⃣ Return clean response
    res.json(topRecommendations);
  } catch (err) {
    console.error("Error generating recommendations:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
