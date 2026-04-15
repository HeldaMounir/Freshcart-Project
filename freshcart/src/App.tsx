import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CategoryDetails from "./pages/CategoryDetails";
import SubCategoryProducts from "./pages/SubCategoryProducts";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category-details/:id" element={<CategoryDetails />} />
        <Route path="/subcategory-products/:subId" element={<SubCategoryProducts />} />
        <Route path="/brands" element={<Brands />} />
        <Route
  path="/subcategory-products"
  element={<SubCategoryProducts />}
/>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;