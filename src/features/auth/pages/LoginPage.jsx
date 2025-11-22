import { useState, useEffect } from "react";
import { useLoginMutation, setCredentials } from "../../../services";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      const user = userData?.data?.user;
      if (user) {
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          console.log("here");
          navigate("/");
        }
      }
    } catch {
      // error is handled by useEffect
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t("login")}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : t("login")}
          </Button>
          <p className="mt-4 text-sm text-center text-muted-foreground">
            {t("Don't have account?")}
            <Link to="/register" className="text-primary hover:underline">
              {t("register")}
            </Link>
          </p>
        </form>
        <div className="flex items-center my-6">
          <Separator className="flex-1" />
          <span className="mx-3 text-gray-400 text-sm">
            {t("orContinueWith")}
          </span>
          <Separator className="flex-1" />
        </div>

        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 transition-colors"
            onClick={() =>
              (window.location.href = `${
                import.meta.env.VITE_API_BASE_URL
              }/auth/github`)
            }
          >
            <FaGithub /> GitHub
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 transition-colors"
            onClick={() =>
              (window.location.href = `${
                import.meta.env.VITE_API_BASE_URL
              }/api/auth/google`)
            }
          >
            <FaGoogle /> Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
