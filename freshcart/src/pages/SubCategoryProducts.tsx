import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

export default function SubCategoryProducts() {
  const { subId } = useParams();
  const [searchParams] = useSearchParams();

  const brandId = searchParams.get("brand");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFilteredProducts() {
      try {
        setLoading(true);

        let url = "/products";

        if (brandId) {
          url += `?brand=${brandId}`;
        } else if (subId) {
          url += `?subcategory=${subId}`;
        }

        const res = await api.get(url);
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    }

    getFilteredProducts();
  }, [brandId, subId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-20 text-xl">
          Loading...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-10 flex items-center gap-4 text-sm">
          <span className="text-gray-500 flex items-center gap-1">
            Active Filters:
          </span>

          <Link to="/products">
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2 font-medium">
              {brandId ? "🏷 Brand" : "📂 Subcategory"}
            </div>
          </Link>

          <Link
            to="/products"
            className="text-gray-400 hover:text-red-500 underline"
          >
            Clear all
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-10 py-10">
        <p className="text-gray-500 mb-10">
          Showing {products.length} products
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm p-4"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-56 object-contain mb-4"
                />

                <h3 className="font-bold mb-2">
                  {product.title}
                </h3>

                <p className="text-green-600 font-bold">
                  {product.price} EGP
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              No Products Found
            </h2>

            <p className="text-gray-500 mb-8">
              No products match your current filters.
            </p>

            <Link to="/products">
              <button className="bg-[#22c55e] text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition">
                View All Products
              </button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}