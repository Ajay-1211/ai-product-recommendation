export default function AdminProductRow({ product, onEdit, onDelete }) {
  return (
    <tr>
      <td className="border px-2 py-1">{product.name}</td>
      <td className="border px-2 py-1">{product.category}</td>
      <td className="border px-2 py-1">${product.price}</td>
      <td className="border px-2 py-1">
        <button
          className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
