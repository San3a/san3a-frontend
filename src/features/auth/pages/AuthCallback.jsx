import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";

export default function AuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token) {
      localStorage.setItem("token", token);

      try {
        if (user) {
          const parsedUser = JSON.parse(decodeURIComponent(user));
          dispatch(setCredentials({ user: parsedUser, token }));
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }

      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Logging in...</div>;
}
