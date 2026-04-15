import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // تأكدي من استيراد Link
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface SubCategory {
  _id: string;
  name: string;
}

interface CategoryInfo {
  name: string;
  image: string;
}

export default function CategoryDetails() {
  const { id } = useParams(); 
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const catRes = await api.get(`/categories/${id}`);
        setCategory(catRes.data.data);

        const subRes = await api.get(`/categories/${id}/subcategories`);
        setSubCategories(subRes.data.data);
      } catch (err) {
        console.error("Error fetching subcategories", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) return <div className="h-screen flex justify-center items-center text-green-600 font-bold text-xl">Loading...</div>;

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <Navbar />

      {/* Header الأخضر */}
      <section className="bg-[#22c55e] py-12 px-4 shadow-lg">
        <div className="container mx-auto px-10">
          <nav className="text-white/80 text-xs mb-4">
              Home / Categories / <span className="text-white font-bold">{category?.name}</span>
          </nav>
          <div className="flex items-center gap-6">
            <div className="bg-white p-2 rounded-2xl shadow-xl w-24 h-24 flex items-center justify-center">
               <img src={category?.image} alt={category?.name} className="w-20 h-20 object-contain" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">{category?.name}</h1>
              <p className="text-white/90 text-lg">Choose a subcategory to browse products</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-10 py-12">
        <Link to="/categories" className="flex items-center gap-2 text-slate-500 hover:text-green-600 mb-8 transition font-medium w-fit">
           <span>←</span> Back to Categories
        </Link>

        <h2 className="text-2xl font-bold text-slate-800 mb-8">
            {subCategories.length} Subcategories in {category?.name}
        </h2>

        {/* شبكة الـ Subcategories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subCategories.length > 0 ? (
            subCategories.map((sub) => (
              <Link 
                to={`/subcategory-products/${sub._id}`} 
                key={sub._id} 
                className="bg-white border border-gray-100 p-8 rounded-4xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer block"
              >
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                  <svg className="w-8 h-8 text-green-600 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-green-600 transition">
                  {sub.name}
                </h3>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400 text-xl bg-white rounded-3xl border border-dashed">
              No subcategories found for this category.
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}