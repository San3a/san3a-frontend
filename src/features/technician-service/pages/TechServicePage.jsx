import { useGetTechServiceByIdQuery } from "../techServiceApi";
import ImageCarousel from "../components/ImageCarousel";
import { Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CircularProgressIndicator from "../../../components/CircularProgressIndicator";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const TechServicePage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetTechServiceByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const handleCheckout = () => {
    navigate(`/checkout/${id}`);
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

  const service = data?.data;
  if (!service)
    return <p className="text-center mt-10">{t("Please try again later.")}</p>;

  return (
    <div className={`max-w-6xl mx-auto p-6 mt-10 flex flex-col  space-y-6`}>
      <h1 className={`text-3xl font-bold text-gray-800 dark:text-gray-100 `}>
        {service.title}
      </h1>
      <div className="lg:w-3/4 space-y-4">
        <ImageCarousel images={service.images} />

        <div className="flex items-center gap-2">
          <Star size={20} className="text-yellow-400 fill-yellow-400" />
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {service.ratingsAverage}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            ({service.ratingsQuantity})
          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-300">
          {service.description}
        </p>
      </div>
      <div
        className={`flex flex-col lg:flex-row
        gap-6`}
      >
        <div className="lg:w-1/4 flex flex-col gap-4">
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {t("Price")}: EGP {service.price}
          </p>
          <Button
            onClick={handleCheckout}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2"
          >
            {t("Proceed to Checkout")}
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white py-2">
            {t("Chat with Technician")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TechServicePage;
