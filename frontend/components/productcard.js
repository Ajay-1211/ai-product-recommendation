// frontend/components/ProductCard.js
export default function ProductCard({ product, onClick }) {
  return (
    <div
      className="bg-gray-800 text-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 m-2 w-64"
      onClick={() => onClick(product._id)}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          onError={(e) => (e.target.src = "/placeholder.png")}
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-1">{product.name}</h2>
        <p className="text-sm text-gray-300 mb-2">{product.category}</p>
        <p className="text-sm text-gray-200 mb-2">{product.description}</p>
        <p className="font-semibold text-blue-400">${product.price}</p>
      </div>
    </div>
  );
}
