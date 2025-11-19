import { useParams } from "react-router-dom";
import { useGetTechServiceByIdQuery } from "../../technician-service/techServiceApi";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { toast } from "sonner";
import CircularProgressIndicator from "../../../components/CircularProgressIndicator";

const Checkout = () => {
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

  return <>Checkout page</>;
};

export default Checkout;
