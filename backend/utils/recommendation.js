import Product from "../models/Product.js";
import natural from "natural";
const TfIdf = natural.TfIdf;

export const getRecommendations = async (productId) => {
  // Fetch all products
  const products = await Product.find();
  const currentProduct = products.find(p => p._id.toString() === productId);
  if (!currentProduct) return [];

  // Prepare TF-IDF
  const tfidf = new TfIdf();
  products.forEach(p => tfidf.addDocument(p.description || ""));

  // Function to calculate cosine similarity
  const cosineSimilarity = (vecA, vecB) => {
    const dot = vecA.reduce((sum, val, idx) => sum + val * vecB[idx], 0);
    const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    if (magA === 0 || magB === 0) return 0;
    return dot / (magA * magB);
  };

  // Compute similarity scores
  const scores = products.map((p, index) => {
    if (p._id.toString() === productId) return { product: p, score: -1 }; // skip itself

    const vecCurrent = Object.keys(tfidf.documents[products.indexOf(currentProduct)])
      .map(term => tfidf.tfidf(term, products.indexOf(currentProduct)));
    const vecCompare = Object.keys(tfidf.documents[index])
      .map(term => tfidf.tfidf(term, index));

    const score = cosineSimilarity(vecCurrent, vecCompare);
    return { product: p, score };
  });

  // Sort by similarity and return top 3
  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, 3).map(s => s.product);
};
