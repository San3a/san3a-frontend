import { useState, useEffect } from "react";
import { useRegisterMutation, setCredentials } from "../../../services";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [register, { isLoading, isError, error }] = useRegisterMutation();

  useEffect(() => {
    if (isError) {
      const msg =
        error?.data?.message || error?.error || t("registrationFailed");
      toast.error(msg);
    }
  }, [isError, error, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !passwordConfirm) {
      toast.error(t("pleaseFillAllFields"));
      return;
    }

    if (password !== passwordConfirm) {
      toast.error(t("passwordsDoNotMatch"));
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

      toast.success(t("registrationSuccessful"));

      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      if (userData.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch {
      // error handled by useEffect
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">{t("register")}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder={t("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" focus:ring-2 focus:ring-blue-500"
            required
          />
          <Input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:ring-2 focus:ring-blue-500"
            required
          />
          <Input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="  focus:ring-2 focus:ring-blue-500"
            required
          />
          <Input
            type="password"
            placeholder={t("confirmPassword")}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="  focus:ring-2 focus:ring-blue-500"
            required
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="font-medium py-2 rounded-md transition-colors"
          >
            {isLoading ? t("registering") : t("register")}
          </Button>
          <p className="mt-4 text-sm text-center text-muted-foreground">
            {t("Already have account?")}
            <Link to="/login" className="text-primary hover:underline">
              {t("login")}
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
          >
            <FaGithub /> GitHub
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 transition-colors"
          >
            <FaGoogle /> Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
