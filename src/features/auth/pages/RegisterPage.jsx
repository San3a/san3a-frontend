import { useState, useEffect } from "react";
import { useRegisterMutation, setCredentials } from "../../../services";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [register, { isLoading, isError, error }] = useRegisterMutation();

  useEffect(() => {
    if (isError) {
      const msg = error?.data?.message || error?.error || "Registration failed";
      toast.error(msg);
    }
  }, [isError, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !passwordConfirm) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userData = await register({
        name,
        email,
        password,
        passwordConfirm,
      }).unwrap();
      dispatch(
        setCredentials({ user: userData?.data?.user, token: userData?.token })
      );

      toast.success("Registration successful!");

      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    } catch {
      // error handled by useEffect
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
