// pages/product/[id].js
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// RecommendedProducts Component
function RecommendedProducts({ products }) {
  if (!products || products.length === 0)
    return <p className="text-white mt-4">No recommendations found.</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Recommended Products</h2>
      <div className="flex flex-wrap gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-gray-800 rounded-lg p-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 hover:scale-105 transition-transform cursor-pointer"
            onClick={() => window.location.href = `/product/${p._id}`}
          >
            <div className="w-full aspect-square overflow-hidden rounded-md bg-gray-700">
              <img
                src={p.image}
                alt={p.name}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold text-white mt-2">{p.name}</h3>
            <p className="text-blue-400 font-semibold">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const router = useRouter();
  const { id: productId } = router.query;

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      try {
        // Fetch single product
        const resProduct = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        setProduct(resProduct.data);

        // Fetch recommendations (make sure route exists in backend)
        const resRecommended = await axios.get(
          `http://localhost:5000/api/products/recommendations/${productId}`
        );
        setRecommended(resRecommended.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch product or recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading)
    return <p className="text-white p-8">Loading product details...</p>;
  if (!product)
    return <p className="text-white p-8">Product not found.</p>;

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-wrap mb-8 gap-4">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-800">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-400 mb-2">{product.category}</p>
          <p className="text-gray-300 mb-4">{product.description}</p>
          <p className="font-semibold text-blue-400 text-xl">${product.price}</p>
        </div>
      </div>

      {/* Recommended Products */}
      <RecommendedProducts products={recommended} />
    </div>
  );
}
