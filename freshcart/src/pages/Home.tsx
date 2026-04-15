import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/Cartslice";
import { FaPlus, FaRegHeart, FaRetweet, FaRegEye, FaStar } from "react-icons/fa";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: { name: string };
}

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
        ]);

        if (!ignore) {
          setProducts(productsRes.data.data);
          setCategories(categoriesRes.data.data);
        }
      } catch (err) {
        if (!ignore) {
          setError("Something went wrong");
          console.error(err);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleAddToCart(productId: string) {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/cart",
      { productId },
      { headers: { token } }
    );

    const cartData =
      response.data?.data?.data ||
      response.data?.data ||
      response.data;

    dispatch(setCart(cartData));

    const cartRes = await api.get("/cart", {
      headers: { token },
    });

    dispatch(setCart(cartRes.data.data));

    alert("Added to cart successfully 💚");
  } catch (err) {
    console.error(err);
    alert("Login First");
  }
}
async function addToWishlist(productId: string) {
  try {
    const token = localStorage.getItem("token");

    await api.post(
      "/wishlist",
      { productId },
      { headers: { token } }
    );

    alert("Product added to Wishlist! ");
  } catch (err) {
    console.error("Error adding to wishlist", err);
    alert("Failed to add to wishlist. Maybe you need to login?");
  }
}

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading...
      </div>
    );

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <Navbar />

      <section className="relative h-112.5 flex items-center bg-cover bg-center mb-8" style={{ backgroundImage: "url('/images/cover.webp')"}}>
        <div className="absolute inset-0 bg-green-500/50"></div>

        <div className="absolute inset-0 bg-green-900/20"></div>
        <div className="container mx-auto px-10 relative z-10">
          <div className="max-w-lg text-white">
            <h1 className="text-5xl font-bold leading-tight mb-4">Fresh Products Delivered to your Door</h1>
            <p className="text-xl mb-8">Get 20% off your first order</p>
            <div className="flex gap-4">
              <button className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition">Shop Now</button>
              <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition">View Deals</button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="w-3 h-3 rounded-full bg-white"></span>
            <span className="w-3 h-3 rounded-full bg-white/50"></span>
            <span className="w-3 h-3 rounded-full bg-white/50"></span>
        </div>
      </section>

      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Free Shipping", desc: "On orders over 500 EGP", icon: "🚚", color: "bg-blue-50" },
            { title: "Secure Payment", desc: "100% secure transactions", icon: "🛡️", color: "bg-green-50" },
            { title: "Easy Returns", desc: "14-day return policy", icon: "🔄", color: "bg-orange-50" },
            { title: "24/7 Support", desc: "Dedicated support team", icon: "🎧", color: "bg-purple-50" },
          ].map((f, i) => (
            <div key={i} className={`${f.color} p-6 rounded-xl flex items-center gap-4 border border-gray-100`}>
              <span className="text-3xl">{f.icon}</span>
              <div>
                <h4 className="font-bold text-sm">{f.title}</h4>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold"><span className="text-green-600 border-l-4 border-green-600 pl-3">Shop By</span> Category</h2>
           <Link to="/categories" className="text-green-600 font-semibold hover:underline flex items-center gap-1">
  View All Categories <span>→</span>
</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {categories.slice(0, 10).map((cat) => (
              <div key={cat._id} className="group cursor-pointer text-center border rounded-xl p-4 hover:shadow-lg transition-all border-gray-100">
                <div className="w-24 h-24 mx-auto mb-3 overflow-hidden rounded-full">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                </div>
                <h3 className="font-medium text-sm text-gray-600">{cat.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-emerald-600 rounded-3xl p-10 text-white relative overflow-hidden group">
            <div className="relative z-10 max-w-62.5`">
                <span className="bg-white/20 text-xs px-3 py-1 rounded-full mb-4 inline-block">🔥 Deal of the Day</span>
                <h3 className="text-3xl font-bold mb-2">Fresh Organic Fruits</h3>
                <p className="mb-4 text-emerald-50">Get up to 40% off on selected organic fruits</p>
                <div className="text-2xl font-bold mb-6">40% OFF <span className="text-xs font-normal opacity-70 ml-2">Use code: ORGANIC40</span></div>
                <button className="bg-white text-emerald-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition">Shop Now →</button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 group-hover:scale-110 transition duration-500 bg-[url('https://freshcart-route.vercel.app/static/media/slider-2.822944b0.jpg')] bg-cover"></div>
          </div>
          
          <div className="bg-orange-500 rounded-3xl p-10 text-white relative overflow-hidden group">
            <div className="relative z-10 max-w-62.5`">
                <span className="bg-white/20 text-xs px-3 py-1 rounded-full mb-4 inline-block">✨ New Arrivals</span>
                <h3 className="text-3xl font-bold mb-2">Exotic Vegetables</h3>
                <p className="mb-4 text-orange-50">Discover our latest collection of premium vegetables</p>
                <div className="text-2xl font-bold mb-6">25% OFF <span className="text-xs font-normal opacity-70 ml-2">Use code: FRESH25</span></div>
                <button className="bg-white text-orange-500 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition">Explore Now →</button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 group-hover:scale-110 transition duration-500 bg-[url('https://freshcart-route.vercel.app/static/media/slider-image-2.3f1e9389f66718fa40c3.jpg')] bg-cover"></div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl font-bold"><span className="text-green-600 border-l-4 border-green-600 pl-3">Featured</span> Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {products.slice(0, 40).map((product) => (
              <div key={product._id} className="group relative border rounded-xl p-4 hover:shadow-xl transition-all bg-white border-gray-100 overflow-hidden">
                
                {product.priceAfterDiscount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
                        -{Math.round(((product.price - product.priceAfterDiscount)/product.price)*100)}%
                    </div>
                )}
                
                
                <div className="absolute top-4 right-12.5 group-hover:right-4 transition-all duration-300 flex flex-col gap-2 z-10">
<button 
      onClick={() => addToWishlist(product._id)} 
      className="p-2.5 bg-white shadow-lg rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 active:scale-90"
      title="Add to Wishlist"
    >
      <FaRegHeart size={14} />
    </button>                    
                    <button className="p-2 bg-white shadow-md rounded-full hover:bg-green-600 hover:text-white transition"><FaRetweet size={14}/></button>
<Link 
  to={`/productdetails/${product._id}`} 
  className="p-2 bg-white rounded-full shadow hover:text-green-600 transition"
>
  <FaRegEye />
</Link>                </div>
{error && (
  <div className="text-red-500 text-center mb-4">
    {error}
  </div>
)}
                <div className="h-48 mb-4 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                    <img src={product.imageCover} alt={product.title} className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition" />
                </div>

                <p className="text-green-600 text-xs font-semibold uppercase tracking-wider mb-1">{product.category?.name}</p>
                <h3 className="font-bold text-sm mb-2 line-clamp-1">{product.title}</h3>
                
                <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-yellow-400"><FaStar size={12}/><FaStar size={12}/><FaStar size={12}/><FaStar size={12}/><FaStar size={12}/></div>
                    <span className="text-gray-400 text-[10px] font-medium">{product.ratingsAverage} ({product.ratingsQuantity})</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-green-600 font-bold text-lg">{product.priceAfterDiscount || product.price} EGP</span>
                    {product.priceAfterDiscount && <span className="text-gray-400 line-through text-xs ml-2">{product.price} EGP</span>}
                  </div>
                  <button onClick={() => handleAddToCart(product._id)} className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition">
                    <FaPlus size={16}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-emerald-50 rounded-[40px] p-12 mb-16 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white">📧</div>
                    <span className="text-sm font-bold text-green-600 tracking-widest uppercase">Newsletter</span>
                </div>
                <h2 className="text-4xl font-black text-slate-800 mb-4">Get the Freshest Updates <span className="text-green-600">Delivered Free</span></h2>
                <p className="text-gray-500 mb-8 max-w-md">Weekly recipes, seasonal offers & exclusive member perks.</p>
                
                <div className="flex gap-4 mb-6">
                    <span className="bg-white px-4 py-2 rounded-full text-xs font-bold text-slate-600 shadow-sm border border-emerald-100 flex items-center gap-2">🥬 Fresh Picks Weekly</span>
                    <span className="bg-white px-4 py-2 rounded-full text-xs font-bold text-slate-600 shadow-sm border border-emerald-100 flex items-center gap-2">🚚 Free Delivery Codes</span>
                </div>

                <div className="relative max-w-lg">
                    <input type="email" placeholder="you@example.com" className="w-full py-4 px-6 rounded-2xl shadow-inner outline-none border-2 border-transparent focus:border-green-500 transition" />
                    <button className="absolute right-2 top-2 bottom-2 bg-green-500 text-white px-8 rounded-xl font-bold hover:bg-green-600 transition shadow-lg shadow-green-200">Subscribe →</button>
                </div>
            </div>

            <div className="w-full md:w-100 bg-slate-900 rounded-4xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <span className="bg-green-500 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest">📱 Mobile App</span>
                    <h3 className="text-2xl font-bold mt-4 mb-2">Shop Faster on Our App</h3>
                    <p className="text-slate-400 text-sm mb-8">Get app-exclusive deals & 15% off your first order.</p>
                    
                    <div className="flex flex-col gap-3">
                        <button className="flex items-center gap-3 bg-slate-800 border border-slate-700 p-3 rounded-2xl hover:bg-slate-700 transition">
                            <span className="text-2xl">🍎</span>
                            <div className="text-left"><p className="text-[10px] opacity-60">Download on the</p><p className="font-bold">App Store</p></div>
                        </button>
                        <button className="flex items-center gap-3 bg-slate-800 border border-slate-700 p-3 rounded-2xl hover:bg-slate-700 transition">
                            <span className="text-2xl">🤖</span>
                            <div className="text-left"><p className="text-[10px] opacity-60">GET IT ON</p><p className="font-bold">Google Play</p></div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
      </div>

     <Footer/>
    </div>
  );
}