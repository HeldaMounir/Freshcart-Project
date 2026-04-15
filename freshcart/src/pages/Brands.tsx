import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


interface Brand {
  _id: string;
  name: string;
  image: string;
}

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBrands() {
      try {
        const res = await api.get("/brands");
        setBrands(res.data.data);
      } catch (err) {
        console.error("Error fetching brands", err);
      } finally {
        setLoading(false);
      }
    }
    getBrands();
  }, []);

  if (loading) return <div className="h-screen flex justify-center items-center text-2xl text-purple-600">Loading Brands...</div>;

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <Navbar />

      <section className="bg-[#a855f7] py-16 px-4 mb-10 shadow-lg">
        <div className="container mx-auto px-10">
          <nav className="text-white/80 text-sm mb-4">
             Home / <span className="text-white font-medium">Brands</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-2xl shadow-inner border border-white/10">
               {/* أيقونة البراند (Tag icon) */}
               <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
               </svg>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white mb-1 tracking-tight">Top Brands</h1>
              <p className="text-white/90 text-lg">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-10 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
<Link 
  to={`/subcategory-products?brand=${brand._id}`} 
  key={brand._id} 
  className="group cursor-pointer bg-white border border-gray-100 rounded-3xl p-6 text-center hover:shadow-2xl hover:border-purple-200 transition-all duration-300 block"
>
  <div className="aspect-video mb-4 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-4">
    <img 
      src={brand.image} 
      alt={brand.name} 
      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-500" 
    />
  </div>
  <h3 className="font-bold text-slate-700 group-hover:text-purple-600 transition">
    {brand.name}
  </h3>
</Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}