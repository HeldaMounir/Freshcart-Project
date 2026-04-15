import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/signin", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      alert("Login successful ");
      navigate("/");
    } catch (error) {
  if (axios.isAxiosError(error)) {
    console.log(error.response?.data);
    alert(error.response?.data?.message || "Login failed");
  } else {
    console.log(error);
    alert("Login failed");
  }

    }
}
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-8 w-100"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Sign In
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white py-3 rounded-lg">
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}