import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { api } from "../services/api";
import { setCart } from "../redux/Cartslice";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Footer from "../components/Footer";

export default function Cart() {
  const dispatch = useDispatch();

  const { items, totalPrice, numOfCartItems } = useSelector(
    (state: RootState) => state.cart
  );

  const token = localStorage.getItem("token");

  async function updateCount(id: string, newCount: number) {
    if (newCount < 1) return;

    try {
      const res = await api.put(
        `/cart/${id}`,
        { count: newCount },
        { headers: { token } }
      );

      console.log("FULL CART RESPONSE:", res.data);

      const cartData =
        res.data?.data?.data || 
        res.data?.data ||       
        res.data;              

      dispatch(setCart(cartData));
    } catch (err) {
      console.error("Error updating cart", err);
    }
  }
  async function removeItem(id: string) {
  try {
    const res = await api.delete(`/cart/${id}`, {
      headers: { token },
    });

    console.log("DELETE RESPONSE:", res.data);

    const cartData =
      res.data?.data?.data ||
      res.data?.data ||
      res.data;

    dispatch(setCart(cartData));
  } catch (err) {
    console.error("Error deleting item", err);
  }
}

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-600 p-2 rounded-lg text-white">🛒</div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>

        <p className="mb-8">
          You have{" "}
          <span className="text-green-600 font-bold">
            {numOfCartItems} item
          </span>{" "}
          in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <div className="bg-white p-10 rounded-xl text-center shadow-sm">
                Your cart is empty
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-2xl mb-4 shadow-sm flex items-center"
                >
                  <img
                    src={item.product.imageCover}
                    className="w-24 h-24 object-contain mr-6"
                    alt={item.product.title}
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">
                      {item.product.title}
                    </h3>

                    <p className="text-green-600 text-sm mb-3">
                      {item.product.category.name}
                    </p>

                    <p className="text-xl font-bold">
                      {item.price} EGP
                    </p>

                    {/* COUNT */}
                    <div className="flex items-center gap-4 mt-4 bg-gray-50 w-fit rounded-full p-1 border">
                      <button
                        onClick={() =>
                          updateCount(item.product._id, item.count - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full"
                      >
                        <FaMinus className="text-xs" />
                      </button>

                      <span className="font-bold">{item.count}</span>

                      <button
                        onClick={() =>
                          updateCount(item._id, item.count + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Total</p>
                    <p className="font-bold text-green-600">
                      {item.price * item.count} EGP
                    </p>

                    <button
  onClick={() => removeItem(item.product._id)}
  className="text-red-500 bg-red-50 p-2 rounded-lg mt-4"
>
  <FaTrash size={14} />
</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl h-fit sticky top-5">
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

            <div className="space-y-4 border-b border-slate-700 pb-6 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">
                  Subtotal ({numOfCartItems})
                </span>
                <span>{totalPrice} EGP</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Shipping</span>
                <span className="text-green-400">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold mb-10">
              <span>Total</span>
              <span className="text-green-400">
                {totalPrice} EGP
              </span>
            </div>

            <button className="w-full bg-green-600 py-4 rounded-xl font-bold">
              👤 Checkout
            </button>
          </div>

          

        </div>
      </div>
      <Footer/>
    </div>
  );
}