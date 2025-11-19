import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const SuccessCashPayment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    toast.success("Order Placed Successfully");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4 -mt-16">
      <div className="flex flex-col items-center justify-center p-8 space-y-6 bg-card text-foreground border border-border rounded-lg shadow-lg max-w-md w-full">
        {/* Success Icon */}
        <CheckCircle2 size={64} className="text-green-500" />

        {/* Message */}
        <h1 className="text-2xl font-bold text-center">
          {t("Payment Successful")}
        </h1>
        <p className="text-center text-muted-foreground">
          {t("Your service order has been placed successfully.")}
        </p>

        {/* Go Home Button */}
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer mt-4 w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          {t("Go to Home")}
        </button>
      </div>
    </div>
  );
};

export default SuccessCashPayment;
