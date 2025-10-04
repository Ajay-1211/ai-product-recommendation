import { useState, useEffect } from "react";

export default function AdminProductForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        category: initial.category || "",
        description: initial.description || "",
        price: initial.price || "",
        image: initial.image || "",
      });
    } else {
      setForm({
        name: "",
        category: "",
        description: "",
        price: "",
        image: "",
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) {
      alert("Please provide name, category and price");
      return;
    }
    onSubmit({ ...form, price: Number(form.price) });
  };

  return (
    <form onSubmit={submit} className="border p-4 rounded bg-gray-800 text-white">
      <div className="mb-2">
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-600 px-2 py-1 rounded bg-gray-700 text-white"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium">Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-600 px-2 py-1 rounded bg-gray-700 text-white"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-600 px-2 py-1 rounded bg-gray-700 text-white"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium">Price</label>
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border border-gray-600 px-2 py-1 rounded bg-gray-700 text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Image URL</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full border border-gray-600 px-2 py-1 rounded bg-gray-700 text-white"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
