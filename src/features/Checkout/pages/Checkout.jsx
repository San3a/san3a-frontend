import { useNavigate, useParams } from "react-router-dom";
import { useGetTechServiceByIdQuery } from "../../technician-service/techServiceApi";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CircularProgressIndicator from "../../../components/CircularProgressIndicator";
import { useSelector } from "react-redux";
import { User } from "lucide-react";
import {
  //   useCreateServiceOrderMutation,
  usePayForATechServiceMutation,
} from "../checkoutApi";

const Checkout = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetTechServiceByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const service = data?.data;
  console.log("service", service);

  const [payWithStripe] = usePayForATechServiceMutation();
  //   const [createServiceOrder] = useCreateServiceOrderMutation();

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handlePayment = async () => {
    let loadingToastId;
    if (paymentMethod === "cash") {
      loadingToastId = toast.loading("Placing the order");
      console.log("loadingToastId", loadingToastId);
      try {
        setTimeout(() => {
          navigate("/success-cash-payment");
          toast.dismiss(loadingToastId);
        }, 1500);
      } catch (err) {
        toast.dismiss(loadingToastId);
        toast.error("Error placing your order", {
          description: err?.data?.message || err?.message || "Please try again",
        });
      }
    } else if (paymentMethod === "stripe") {
      toast.loading("Paying with stripe");
      try {
        const session = await payWithStripe(service?._id).unwrap();
        const redirectUrl = session?.session?.url;
        if (redirectUrl) {
          toast.dismiss();
          toast.info("Redirecting to Stripe");
          window.location.href = redirectUrl;
        }
        console.log("session", session);
      } catch (err) {
        toast.dismiss();
        toast.error("Payment failed ", err?.message);
        return;
      }
    }
  };

  useEffect(() => {
    if (isError) {
      const msg =
        error?.data?.message || error?.error || t("Failed to fetch service");
      toast.error(msg, {
        description: t("Please try again later."),
        duration: 4000,
      });
    }
  }, [isError, error, t]);

  if (isLoading) return <CircularProgressIndicator />;

  if (!service)
    return <p className="text-center mt-10">{t("Please try again later.")}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{t("Checkout")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* =========================
              LEFT COLUMN - DETAILS
        ========================== */}
        <div className="lg:col-span-2 space-y-6">
          {/* SERVICE SUMMARY */}
          <div className="border border-border rounded-lg p-4 shadow bg-card text-foreground">
            <h2 className="text-xl font-semibold mb-4">
              {t("Service Summary")}
            </h2>

            <div className="flex items-start gap-4">
              <img
                src={service?.images?.[0]?.url}
                alt={service?.title}
                className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
              />

              <div className="flex-1">
                <p className="text-2xl font-bold mb-2">{service?.title}</p>

                <p className="text-muted-foreground text-sm line-clamp-3 mb-2">
                  {service?.description}
                </p>

                <p className="text-sm text-muted-foreground">
                  {t("Category")}: {service?.category?.name}
                </p>
              </div>
            </div>
          </div>

          {/* TECHNICIAN */}
          <div className="border border-border rounded-lg p-6 shadow-sm bg-card text-foreground hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              {t("Technician")}
            </h2>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {service?.user?.image?.url ? (
                  <img
                    src={service?.user?.image?.url}
                    alt={service?.user?.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-border"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <User size={24} className="text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-semibold text-lg text-foreground truncate">
                    {service?.user?.name}
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ${
                      service?.user?.active
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    <span
                      className={`mx-1 w-1.5 h-1.5 rounded-full mr-1.5 ${
                        service?.user?.active ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                    {service?.user?.active ? t("Active") : t("Inactive")}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground capitalize mb-2">
                  {service?.user?.role}
                </p>

                {service?.user?.address && (
                  <p className="text-sm text-muted-foreground mt-1">
                    <span>{t("Address")}</span>:
                    <span className="mx-1">{service?.user.address}</span>
                  </p>
                )}

                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => {
                      const rating = service?.user?.rating || 0;
                      const isFilled = i < Math.floor(rating);
                      const isHalf =
                        !isFilled && i < Math.ceil(rating) && rating % 1 !== 0;

                      return (
                        <span key={i} className="relative text-base">
                          {isHalf ? (
                            <>
                              <span className="text-gray-300 dark:text-gray-600">
                                ★
                              </span>
                              <span className="absolute inset-0 overflow-hidden w-1/2 text-yellow-500">
                                ★
                              </span>
                            </>
                          ) : (
                            <span
                              className={
                                isFilled
                                  ? "text-yellow-500"
                                  : "text-gray-300 dark:text-gray-600"
                              }
                            >
                              ★
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {service?.user?.rating?.toFixed(1) || "0.0"}
                  </span>
                  <span className="text-sm text-muted-foreground">/ 5</span>
                </div>
              </div>
            </div>
          </div>

          {/* USER INFO */}
          <div className="border border-border rounded-lg p-4 shadow bg-card text-foreground">
            <h2 className="text-xl font-semibold mb-3">{t("Your Info")}</h2>

            <div className="flex items-center gap-3">
              {user?.image?.url ? (
                <img
                  src={user?.image?.url}
                  alt={user?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              )}

              <div>
                <p className="font-medium text-lg">{user?.name}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {user?.role}
                </p>

                {user?.address && (
                  <p className="text-sm text-muted-foreground mt-1">
                    <span>{t("Address")}</span>:
                    <span className="mx-1">{user.address}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================
              RIGHT COLUMN - PRICE SUMMARY
        ========================== */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            {/* PAYMENT METHOD */}
            <div className="border border-border rounded-lg p-4 shadow bg-card text-foreground">
              <h2 className="text-xl font-semibold mb-3">
                {t("Payment Method")}
              </h2>

              <div className="space-y-2">
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
            </div>

            {/* ORDER SUMMARY */}
            <div className="border border-border rounded-lg p-4 shadow bg-card text-foreground">
              <h2 className="text-xl font-semibold mb-4">
                {t("Order Summary")}
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <p className="text-muted-foreground">{t("Service Price")}</p>
                  <p className="font-medium">{service?.price} EGP</p>
                </div>

                <div className="flex justify-between text-sm">
                  <p className="text-muted-foreground">
                    {t("Service Fee")} (5%)
                  </p>
                  <p className="font-medium">
                    {(service?.price * 0.05).toFixed(2)} EGP
                  </p>
                </div>

                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <p>{t("Total")}</p>
                    <p>{(service?.price * 1.05).toFixed(2)} EGP</p>
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

export default Checkout;
