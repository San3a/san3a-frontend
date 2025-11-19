import { useGetTechServiceByIdQuery } from "../techServiceApi";
import ImageCarousel from "../components/ImageCarousel";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CircularProgressIndicator from "../../../components/CircularProgressIndicator";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import imageDefault from "@/assets/default-user.jpg";
import AvailabilityPicker from "../components/AvailabilityPicker";

const TechServicePage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetTechServiceByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

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
  console.log(service);
  return (
    <div className=" mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6 p-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {service.title}
          </h1>

          <ImageCarousel images={service.images} />

          <p className="font-bold">{t("description")}</p>
          <p>{service.description}</p>
          <p className="font-bold">{t("rating")}</p>

          <div className="flex items-center gap-2">
            <Star size={20} className="text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{service.ratingsAverage}</span>
            <span className="text-gray-500 dark:text-gray-400">
              ({service.ratingsQuantity})
            </span>
          </div>
        </div>

        <div className="lg:col-span-1 border p-6 flex flex-col gap-6 bg-white dark:bg-gray-900 shadow-md">
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {t("Price")}: EGP {service.price}
          </p>

          <Button>{t("Chat with Technician")}</Button>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">
              {t("Technician Information")}
            </h3>

            <div className="flex items-center gap-3">
              <img
                src={service.user?.profileImage?.url || imageDefault}
                alt="Technician"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {service.user?.name}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {service.user?.phone}
                </p>
                <p className="text-gray-400 text-sm">{service.user?.email}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold">{t("Availability")} </h3>
            <AvailabilityPicker availabilities={service?.availabity} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechServicePage;
