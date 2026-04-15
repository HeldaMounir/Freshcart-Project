import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaHeart } from "react-icons/fa";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  category?: {
    name: string;
  };
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  async function getWishlist() {
    try {
      setLoading(true);
      const res = await api.get("/wishlist", {
        headers: { token },
      });

    
      const data = res.data?.data || [];
      setWishlist(data);
    } catch (err) {
      console.error("Wishlist error:", err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }

  async function removeFromWishlist(productId: string) {
    try {
      await api.delete(`/wishlist/${productId}`, {
        headers: { token },
      });
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Remove error:", err);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center text-green-600 font-bold text-xl">
        <div className="animate-bounce">Loading Wishlist...</div>
      </div>
    );

  return (
    <div className="bg-[#f8f9fa] min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-10 py-10 grow">
        {/* Breadcrumbs */}
        <nav className="text-gray-400 text-xs mb-6">
          Home / <span className="text-gray-800 font-medium">Wishlist</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-red-50 p-4 rounded-2xl">
            <FaHeart className="text-red-500 text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Wishlist</h1>
            <p className="text-gray-500 text-sm">{wishlist.length} items saved in your list</p>
          </div>
        </div>

        {wishlist.length > 0 ? (
          <div className="bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-sm">
            {/* Table Header - Visible on desktop */}
            <div className="hidden md:grid grid-cols-12 bg-gray-50/50 p-5 text-sm font-bold text-gray-400 border-b">
              <div className="col-span-6">PRODUCT DETAILS</div>
              <div className="col-span-2 text-center">PRICE</div>
              <div className="col-span-4 text-center">ACTION</div>
            </div>

            {/* List Items */}
            {wishlist.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-1 md:grid-cols-12 p-6 items-center border-b last:border-0 hover:bg-gray-50 transition"
              >
                {/* Product Info */}
                <div className="col-span-1 md:col-span-6 flex items-center gap-6">
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl p-2 border border-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="max-h-full object-contain hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1 leading-tight">
                      {product.title}
                    </h3>
                    <p className="text-xs text-green-600 font-bold uppercase tracking-wider">
                      {product.category?.name || "General"}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-1 md:col-span-2 text-center font-black text-slate-700 my-4 md:my-0">
                  {product.price} <span className="text-xs font-normal">EGP</span>
                </div>

                {/* Actions */}
                <div className="col-span-1 md:col-span-4 flex items-center justify-center gap-4">
                  <button className="grow md:flex-none bg-[#22c55e] text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-lg shadow-green-100">
                    <FaShoppingCart /> Add To Cart
                  </button>
                  
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition border border-gray-50"
                    title="Remove item"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeart className="text-gray-200 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm">
              Save your favorite items here to find them easily and even get notified on price drops.
            </p>
            <Link
              to="/products"
              className="inline-block bg-[#22c55e] text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-100"
            >
              Explore Products
            </Link>
          </div>
        )}

        <Link to="/products" className="inline-block mt-10 text-gray-400 hover:text-green-600 transition font-medium">
          ← Back to Shopping
        </Link>
      </div>

      <Footer />
    </div>
  );
}