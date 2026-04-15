export default function Footer() {
  return (
     <footer className="bg-slate-900 text-gray-400 pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
                <div className="bg-white w-fit p-2 rounded-lg mb-6">
                    <span className="text-2xl font-black text-slate-900">🛒 FreshCart</span>
                </div>
                <p className="max-w-xs mb-8 leading-relaxed text-sm">FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands.</p>
                <div className="flex gap-4">
                    <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-500 hover:text-white cursor-pointer transition">f</span>
                    <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-500 hover:text-white cursor-pointer transition">t</span>
                    <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-500 hover:text-white cursor-pointer transition">i</span>
                </div>
            </div>
            <div>
                <h4 className="text-white font-bold mb-6">Shop</h4>
                <ul className="space-y-4 text-sm">
                    <li className="hover:text-green-500 cursor-pointer">All Products</li>
                    <li className="hover:text-green-500 cursor-pointer">Categories</li>
                    <li className="hover:text-green-500 cursor-pointer">Brands</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-6">Support</h4>
                <ul className="space-y-4 text-sm">
                    <li className="hover:text-green-500 cursor-pointer">Help Center</li>
                    <li className="hover:text-green-500 cursor-pointer">Shipping Info</li>
                    <li className="hover:text-green-500 cursor-pointer">Returns</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-6">Contact</h4>
                <p className="text-sm leading-relaxed">123 Commerce Street, New York, NY 10001</p>
                <p className="text-sm mt-4 text-green-500 font-bold">support@freshcart.com</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:row justify-between items-center gap-4 text-xs">
            <p>© 2026 FreshCart. All rights reserved.</p>
            <div className="flex gap-6">
                <span>Visa</span> <span>Mastercard</span> <span>PayPal</span>
            </div>
          </div>
        </div>
      </footer>
  )
}
