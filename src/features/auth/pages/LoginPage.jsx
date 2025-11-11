import { useState, useEffect } from "react";
import { useLoginMutation, setCredentials } from "../../../services";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, isError, error }] = useLoginMutation();

  useEffect(() => {
    if (isError) {
      const msg = error?.data?.message || error?.error || "Login failed";
      toast.error(msg);
    }
  }, [isError, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({ user: userData?.data?.user, token: userData?.token })
      );
      toast.success("Login successful!");
      setEmail("");
      setPassword("");
    } catch {
      // error is handled by useEffect
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
