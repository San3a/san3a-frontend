import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { XCircle, Home, ArrowLeft, RefreshCcw } from "lucide-react";
import { useCancelPaymentQuery } from "../checkoutApi";

const CancelPayment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  const { data, error, isLoading } = useCancelPaymentQuery(sessionId);

  console.log("data", data);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-foreground mb-3">
            {t("Payment Cancelled")}
          </h1>

          {/* Message */}
          <p className="text-muted-foreground mb-2">
            {t("Your payment has been cancelled.")}
          </p>
          <p className="text-muted-foreground mb-8">
            {t("No charges have been made to your account.")}
          </p>

          {/* Information Box */}
          <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-foreground mb-2">
              {t("What happened?")}
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>{t("You chose to cancel the payment process")}</li>
              <li>{t("Your order has not been placed")}</li>
              <li>{t("You can try again at any time")}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 px-4 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              {t("Go to Home")}
            </button>

            <button
              onClick={() => navigate("/tech-services")}
              className="w-full py-3 px-4 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              {t("Browse Tech Services")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelPayment;
