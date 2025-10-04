import { useEffect, useState } from "react";
import axios from "axios";
import AdminProductForm from "../../components/AdminProductForm"; 
import AdminProductRow from "../../components/adminproductrow"; // make sure this exists

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrEdit = async (product) => {
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/products/${editing._id}`, product);
      } else {
        await axios.post("http://localhost:5000/api/products", product);
      }
      setEditing(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <AdminProductForm
        initial={editing}
        onSubmit={handleAddOrEdit}
        onCancel={() => setEditing(null)}
      />

      <table className="mt-6 w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border px-2 py-2 border-gray-600">Name</th>
            <th className="border px-2 py-2 border-gray-600">Category</th>
            <th className="border px-2 py-2 border-gray-600">Price</th>
            <th className="border px-2 py-2 border-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <AdminProductRow
              key={p._id}
              product={p}
              onEdit={() => setEditing(p)}
              onDelete={async () => {
                await axios.delete(`http://localhost:5000/api/products/${p._id}`);
                fetchProducts();
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
