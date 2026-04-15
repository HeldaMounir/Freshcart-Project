import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/Cartslice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPlus, FaStar, FaHeart } from "react-icons/fa";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: {
    _id: string;
    name: string;
  };
}

interface WishlistResponseItem {
  _id: string;
  product: string | { _id: string };
}

export default function Products() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  async function getWishlist() {
    try {
      const res = await api.get("/wishlist");

      const ids: string[] = res.data.data.map(
        (item: WishlistResponseItem) =>
          typeof item.product === "string"
            ? item.product
            : item.product._id
      );

      setWishlistIds(ids);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await api.get("/products");
        let allProducts = res.data.data;

        if (categoryId) {
          allProducts = allProducts.filter(
            (product: Product) =>
              product.category?._id === categoryId
          );
        }

        setProducts(allProducts);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [categoryId]);

  async function handleAddToCart(productId: string) {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/cart",
        { productId },
        { headers: { token } }
      );

      dispatch(setCart(res.data.data));

      alert("Product added successfully ");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  }

 async function toggleWishlist(productId: string) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const isInWishlist = wishlistIds.includes(productId);

    if (isInWishlist) {
      await api.delete(`/wishlist/${productId}`, {
        headers: { token },
      });

      setWishlistIds((prev) =>
        prev.filter((id) => id !== productId)
      );
    } else {
      await api.post(
        "/wishlist",
        { productId },
        { headers: { token } }
      );

      setWishlistIds((prev) => [
        ...prev,
        productId,
      ]);
    }
  } catch (err) {
    console.error(err);
  }
}

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <Navbar />

      <div className="container mx-auto px-10 py-10">
        <p className="text-slate-500 mb-10">
          Showing {products.length} products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-3xl p-5 shadow-sm relative"
            >
             
              <button
                onClick={() => toggleWishlist(product._id)}
                className="absolute top-4 right-4 text-xl"
              >
                <FaHeart
                  className={
                    wishlistIds.includes(product._id)
                      ? "text-red-500"
                      : "text-gray-300"
                  }
                />
              </button>

              <div className="h-56 mb-5 flex items-center justify-center">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="max-h-full object-contain"
                />
              </div>

              <p className="text-green-600 text-xs mb-1">
                {product.category?.name}
              </p>

              <h3 className="font-bold mb-3">
                {product.title}
              </h3>

              <div className="flex items-center gap-1 mb-4">
                <FaStar size={12} />
                <span>
                  {product.ratingsAverage} (
                  {product.ratingsQuantity})
                </span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-green-600 font-bold">
                  {product.price} EGP
                </p>

                <button
                  onClick={() =>
                    handleAddToCart(product._id)
                  }
                  className="bg-green-600 text-white p-3 rounded-xl"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}