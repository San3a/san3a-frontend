import { useGetTechServiceByIdQuery } from "../techServiceApi";
import ImageCarousel from "../components/ImageCarousel";
import { useParams } from "react-router-dom";
import CircularProgressIndicator from "../../../components/CircularProgressIndicator";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import imageDefault from "@/assets/default-user.jpg";
import AvailabilityPicker from "../components/AvailabilityPicker";
import RatingComponent from "../components/RatingComponent";
import TechnicianInformation from "../components/TechnicianInformation";
import ReviewsSection from "../components/ReviewsSection";
import { useSelector } from "react-redux";
import ChatButton from "../../chat/components/ChatButton";

const TechServicePage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
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
          <RatingComponent
            ratingsAverage={service.ratingsAverage}
            ratingsQuantity={service.ratingsQuantity}
          />
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">{t("Reviews")}</h2>
            <ReviewsSection id={id} userId={user._id} userHasBooked={true} />
          </div>
        </div>
        <div className="lg:col-span-1 border p-6 flex flex-col gap-6 bg-white dark:bg-gray-900 shadow-md">
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {t("Price")}: {service.price} {t("egp")}
          </p>
          <ChatButton userId={service?.user?._id} currentUserId={user._id} />
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">
              {t("Technician Information")}
            </h3>
            <div className="flex items-center gap-3">
              <TechnicianInformation
                user={service.user}
                imageDefault={imageDefault}
              />
            </div>
          </div>
          <div className="border-t pt-4">
            {/* <h3 className="text-lg font-semibold">{t("Availability")} </h3> */}
            <AvailabilityPicker availabilities={service?.availabity} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechServicePage;
