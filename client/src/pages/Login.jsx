import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Mark admin login
      localStorage.setItem("isAdmin", "true");

      // ✅ Redirect properly using React Router
      navigate("/");

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#111] p-10 w-[400px] border border-gold">

        <h2 className="text-3xl mb-6 font-serif text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 text-black outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 text-black outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gold text-black py-2 hover:bg-white transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </section>
  );
}

export default Login;