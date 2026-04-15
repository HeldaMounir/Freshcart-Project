import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import {
  FaStar,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaPencilAlt,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Product {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: { name: string };
  brand: { name: string };
  quantity: number;
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [count, setCount] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  async function getProductDetails() {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.data);
      setMainImage(res.data.data.imageCover);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center text-green-600 font-bold">
        Loading...
      </div>
    );

  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  const ratings = [
    { stars: 5, percent: 70 },
    { stars: 4, percent: 20 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 2 },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          Home &gt; {product.category.name} &gt;{" "}
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-12 gap-12">

          {/* Images */}
          <div className="md:col-span-5">
            <div className="border rounded-2xl p-4 mb-4 bg-gray-50">
              <img
                src={mainImage}
                className="w-full h-[500px] object-contain"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className="w-20 h-20 border rounded-lg overflow-hidden"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-7">
            <span className="text-green-600 text-sm font-bold">
              {product.category.name}
            </span>

            <h1 className="text-3xl font-bold mt-2 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-4 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(product.ratingsAverage)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="text-gray-500 text-sm">
                ({product.ratingsQuantity} reviews)
              </span>
            </div>

            <p className="text-gray-600 mb-4">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-green-600">
                {product.price} EGP
              </span>
              <span className="line-through text-gray-400">
                {product.price + 50} EGP
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() =>
                  setCount(Math.max(1, count - 1))
                }
                className="p-3 border rounded"
              >
                <FaMinus />
              </button>

              <span className="px-6">{count}</span>

              <button
                onClick={() => setCount(count + 1)}
                className="p-3 border rounded"
              >
                <FaPlus />
              </button>
            </div>

            {/* Buttons */}
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-20 border-t pt-10">

          <div className="flex gap-8 border-b mb-8">
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-3 ${
                activeTab === "details"
                  ? "border-b-2 border-green-600 text-green-600 font-bold"
                  : "text-gray-400"
              }`}
            >
              Details
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 ${
                activeTab === "reviews"
                  ? "border-b-2 border-green-600 text-green-600 font-bold"
                  : "text-gray-400"
              }`}
            >
              Reviews
            </button>

            <button
              onClick={() => setActiveTab("shipping")}
              className={`pb-3 ${
                activeTab === "shipping"
                  ? "border-b-2 border-green-600 text-green-600 font-bold"
                  : "text-gray-400"
              }`}
            >
              Shipping
            </button>
          </div>

          {activeTab === "details" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-bold mb-4">
                  Product Info
                </h3>

                <p className="text-sm text-gray-500">
                  Category: {product.category.name}
                </p>
                <p className="text-sm text-gray-500">
                  Brand: {product.brand.name}
                </p>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-3 text-center">
                  <h2 className="text-5xl font-bold">
                    {product.ratingsAverage}
                  </h2>
                  <div className="text-yellow-400 flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>

                <div className="md:col-span-9 space-y-3">
                  {ratings.map((r) => (
                    <div
                      key={r.stars}
                      className="flex items-center gap-3"
                    >
                      <span className="w-10 text-sm">
                        {r.stars}★
                      </span>

                      <div className="flex-1 bg-gray-200 h-2 rounded">
                        <div
                          className="bg-yellow-400 h-2 rounded"
                          style={{ width: `${r.percent}%` }}
                        />
                      </div>

                      <span className="text-sm">
                        {r.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-10">
                <FaPencilAlt className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">
                  No reviews yet
                </p>
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-green-50 p-6 rounded-2xl">
                <FaTruck className="text-green-600 mb-3" />
                <h3 className="font-bold mb-2">
                  Shipping
                </h3>
                <p className="text-sm text-gray-600">
                  Fast delivery 3-5 days
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-2xl">
                <FaUndo className="text-green-600 mb-3" />
                <h3 className="font-bold mb-2">
                  Returns
                </h3>
                <p className="text-sm text-gray-600">
                  30 days return policy
                </p>
              </div>

              <div className="md:col-span-2 flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <FaShieldAlt />
                <p className="text-sm">
                  Buyer protection guaranteed
                </p>
              </div>

            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}