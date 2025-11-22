import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CircularProgressIndicator from "../../../components/CircularProgressIndicator";
import { useSelector } from "react-redux";
import { User } from "lucide-react";
import {
  useCreateServiceOrderMutation,
  usePayForAnOfferMutation,
} from "../checkoutApi";
import { useGetOfferQuery } from "../../posts/postsApi";

const OfferCheckout = () => {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetOfferQuery({ offerId: id });
  const offer = data?.data?.offer;
  console.log("offer", offer);
  const [payWithStripe] = usePayForAnOfferMutation();
  const [createServiceOrder] = useCreateServiceOrderMutation();

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handlePayment = async () => {
    let loadingToastId;

    // CASH PAYMENT
    if (paymentMethod === "cash") {
      loadingToastId = toast.loading("Placing the order...");
      try {
        const body = {
          user: user?._id,
          serviceType: "Offer",
          service: offer?._id,
          paymentMethod: "cash",
          paidAt: new Date().toISOString(),
          address: user?.address,
        };
        console.log("body", body);

        const newServiceOrder = await createServiceOrder(body).unwrap();
        console.log("newServiceOrder", newServiceOrder);

        setTimeout(() => {
          navigate("/success-cash-payment");
          toast.dismiss(loadingToastId);
        }, 1500);
      } catch (err) {
        toast.dismiss(loadingToastId);
        console.error("err", err);
        toast.error("Error placing your order", {
          description: err?.data?.message || err?.message || "Please try again",
        });
      }
    } else if (paymentMethod === "stripe") {
      toast.loading("Redirecting to Stripe...");
      try {
        const session = await payWithStripe(offer?._id).unwrap();
        const redirectUrl = session?.session?.url;

        if (redirectUrl) {
          toast.dismiss();
          window.location.href = redirectUrl;
        }
      } catch (err) {
        console.error("err", err);
        toast.dismiss();
        toast.error("Payment failed", {
          description: err?.message,
        });
      }
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(
        error?.data?.message || error?.error || t("Failed to fetch offer"),
        { description: t("Please try again later.") }
      );
    }
  }, [isError, error, t]);

  if (isLoading) return <CircularProgressIndicator />;

  if (!offer)
    return <p className="text-center mt-10">{t("Please try again later.")}</p>;

  const technician = offer?.technician;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{t("Checkout")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* OFFER SUMMARY */}
          <div className="border border-border rounded-lg p-4 shadow bg-card text-foreground">
            <h2 className="text-xl font-semibold mb-4">{t("Offer Summary")}</h2>

            <div className="flex items-start gap-4">
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-sm text-muted-foreground">No Image</span>
              </div>

              <div className="flex-1">
                <p className="text-2xl font-bold mb-2">{offer?.message}</p>

                <p className="text-sm text-muted-foreground mt-2">
                  {t("Sent by technician on")}:{" "}
                  {new Date(offer?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* TECHNICIAN */}
          <div className="border border-border rounded-lg p-6 shadow bg-card text-foreground">
            <h2 className="text-xl font-semibold mb-4">{t("Technician")}</h2>

            <div className="flex items-start gap-4">
              {technician?.image?.url ? (
                <img
                  src={technician.image.url}
                  alt={technician.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-border"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <User size={24} className="text-muted-foreground" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-lg">{technician?.name}</p>

                <p className="text-sm text-muted-foreground capitalize">
                  {technician?.role}
                </p>

                <p className="text-sm text-muted-foreground mt-1">
                  {t("Address")}: {technician?.address || t("No address")}
                </p>
              </div>
            </div>
          </div>

          {/* USER INFO */}
          <div className="border border-border rounded-lg p-4 shadow bg-card text-foreground">
            <h2 className="text-xl font-semibold mb-3">{t("Your Info")}</h2>

            <div className="flex items-center gap-3">
              {user?.image?.url ? (
                <img
                  src={user.image.url}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-blue-500" />
              )}

              <div>
                <p className="font-medium text-lg">{user?.name}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {user?.role}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("Address")}: {user?.address || t("No address")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            {/* PAYMENT METHOD */}
            <div className="border border-border rounded-lg p-4 shadow bg-card text-foreground">
              <h2 className="text-xl font-semibold mb-3">
                {t("Payment Method")}
              </h2>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                {t("Cash on Delivery")}
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                />
                {t("Credit Card (Stripe)")}
              </label>
            </div>

            {/* ORDER SUMMARY */}
            <div className="border border-border rounded-lg p-4 shadow bg-card text-foreground">
              <h2 className="text-xl font-semibold mb-4">
                {t("Order Summary")}
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <p className="text-muted-foreground">{t("Offer Price")}</p>
                  <p className="font-medium">{offer?.price} EGP</p>
                </div>

                <div className="flex justify-between text-sm">
                  <p className="text-muted-foreground">
                    {t("Service Fee")} (5%)
                  </p>
                  <p className="font-medium">
                    {(offer?.price * 0.05).toFixed(2)} EGP
                  </p>
                </div>

                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <p>{t("Total")}</p>
                    <p>{(offer?.price * 1.05).toFixed(2)} EGP</p>
                  </div>
                </div>
              </div>

              <button
                className="w-full py-3 rounded-lg text-primary-foreground font-semibold bg-primary hover:opacity-90 cursor-pointer transition-opacity"
                onClick={handlePayment}
              >
                {t("Confirm Order")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCheckout;
