// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Example: fetch user info from token
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    // Decode or fetch user data if needed
    // For simplicity, assuming name stored in token payload or fetched from API
    setUserName("Ajay"); 

    // Fetch products & recommendations
    fetchProducts(token);
  }, []);

  const fetchProducts = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);

      if (res.data.length > 0) {
        const randomProduct = res.data[Math.floor(Math.random() * res.data.length)];
        const recRes = await axios.get(
          `http://localhost:5000/api/products/recommendations/${randomProduct._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRecommendations(recRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      {/* Header with Welcome and Logout */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {userName || "User"} 👋</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Product Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => router.push(`/product/${p._id}`)}
          >
            <div className="w-full aspect-square overflow-hidden rounded-md bg-gray-700">
              <img src={p.image} alt={p.name} className="object-cover w-full h-full" />
            </div>
            <h3 className="text-lg font-semibold text-white mt-2">{p.name}</h3>
            <p className="text-blue-400 font-semibold">${p.price}</p>
          </div>
        ))}
      </div>

      {/* Recommendations Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Recommended for you</h2>
        <div className="flex flex-wrap gap-4">
          {recommendations.map((r) => (
            <div
              key={r._id}
              className="bg-gray-800 rounded-lg p-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 hover:scale-105 transition-transform cursor-pointer"
              onClick={() => router.push(`/product/${r._id}`)}
            >
              <div className="w-full aspect-square overflow-hidden rounded-md bg-gray-700">
                <img src={r.image} alt={r.name} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-lg font-semibold text-white mt-2">{r.name}</h3>
              <p className="text-blue-400 font-semibold">${r.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
