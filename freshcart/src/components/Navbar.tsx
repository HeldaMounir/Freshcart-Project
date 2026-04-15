import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import type { RootState } from "../redux/store";
import { api } from "../services/api";
import {
  FaRegHeart,
  FaShoppingCart,
  FaSearch,
  FaHeadset,
} from "react-icons/fa";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  category: {
    _id: string;
    name: string;
  };
}

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { numOfCartItems } = useSelector(
    (state: RootState) => state.cart
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          api.get("/categories"),
          api.get("/products"),
        ]);

        setCategories(categoriesRes.data.data);
        setProducts(productsRes.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []);

  const categoriesWithProducts = useMemo(() => {
    return categories.filter((category) =>
      products.some(
        (product) =>
          product.category._id === category._id
      )
    );
  }, [categories, products]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white">
      <div className="border-b border-gray-100 py-2 text-[13px] text-gray-500 hidden md:block">
        <div className="container mx-auto px-10 flex justify-between items-center">
          <div className="flex gap-4">
            <span>🚚 Free Shipping on Orders 500 EGP</span>
            <span>🎁 New Arrivals Daily</span>
          </div>

          <div className="flex gap-4 items-center">
            <span>📞 +1 (800) 123-4567</span>
            <span>✉️ support@freshcart.com</span>
            <div className="h-4 w-px bg-gray-300 mx-2"></div>

            {!token ? (
              <div className="flex gap-3">
                <Link to="/login">Sign In</Link>
                <Link to="/register">Sign Up</Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="hover:text-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-10 py-5 flex items-center justify-between gap-8">
        <Link to="/">
          <img
            src="/images/freshcart-logo.svg"
            alt="FreshCart"
            className="w-40"
          />
        </Link>

        <div className="flex-1 max-w-2xl relative hidden lg:block">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full border rounded-lg px-4 py-2.5"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-green-600 p-2 rounded-lg">
            <FaSearch size={14} />
          </button>
        </div>

        <nav className="hidden xl:flex items-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>

          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer">
              <span>Categories</span>
              <span className="text-[10px]">▼</span>
            </div>

            <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {categoriesWithProducts.map((category) => (
                <Link
                  key={category._id}
                  to={`/products?category=${category._id}`}
                  className="block px-4 py-3 text-sm hover:bg-green-50 hover:text-green-600"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/brands">Brands</Link>
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-2 border-r pr-5">
            <FaHeadset size={20} />
            <div>
              <p className="text-[11px] text-gray-400">Support</p>
              <p className="text-[13px] font-bold">24/7 Help</p>
            </div>
          </div>

          <Link to="/wishlist">
            <FaRegHeart size={22} />
          </Link>

          <Link to="/cart" className="relative">
            <FaShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
              {numOfCartItems || 0}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}