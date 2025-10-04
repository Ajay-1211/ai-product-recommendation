// frontend/components/RecommendedProducts.js
import ProductCard from "./productcard";

export default function RecommendedProducts({ products }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Recommended Products</h3>
      <div className="flex flex-wrap">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
}
