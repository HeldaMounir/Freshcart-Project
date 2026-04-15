import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data);
      } catch (err) {
        console.error("Error fetching categories", err);
      } finally {
        setLoading(false);
      }
    }
    getCategories();
  }, []);

  if (loading) return <div className="h-screen flex justify-center items-center text-2xl text-green-600">Loading Categories...</div>;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <section className="bg-[#22c55e] py-16 px-4 mb-10">
        <div className="container mx-auto px-10">
          <nav className="text-white/80 text-sm mb-4">
             Home / <span className="text-white">Categories</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">All Categories</h1>
              <p className="text-white/90">Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-10 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link 
              to={`/category-details/${cat._id}`} 
              key={cat._id} 
              className="group cursor-pointer border border-gray-100 rounded-3xl p-6 text-center hover:shadow-2xl hover:border-green-200 transition-all duration-300 bg-white block"
            >
              <div className="w-full aspect-square mb-6 overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center p-4">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-500" 
                />
              </div>
              <h3 className="font-bold text-slate-800 group-hover:text-green-600 transition">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}