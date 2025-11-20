import { useSearchParams } from "react-router-dom";
import { useGetTechServicesQuery } from "../techServiceApi";
import CircularProgressIndicator from "../../../components/CircularProgressIndicator";
import TechServiceCard from "../components/TechServiceCard";
import FiltersSidebar from "../components/FiltersSidebar";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { AddTechServiceModal } from "../components/AddTechServiceModal";
import { Button } from "../../../components/ui/button";

const TechServicesPage = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const filters = Object.fromEntries([...searchParams]);
  const user = useSelector((state) => state.auth.user);
  const { data, error, isLoading, isError } = useGetTechServicesQuery(filters, {
    refetchOnMountOrArgChange: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isError) {
      const msg =
        error?.data?.message || error?.error || "Failed to fetch categories";
      toast.error(msg, {
        description: t("Please try again later."),
        duration: 4000,
      });
    }
  }, [isError, error, t]);

  return (
    <div className="flex min-h-[80vh]">
      <FiltersSidebar />

      <div className="flex-1 flex flex-col">
        {user?.role === "technician" && (
          <div className="p-4">
            <Button onClick={() => setIsModalOpen(true)}>
              + {t("Add New Service")}
            </Button>
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgressIndicator />
          </div>
        ) : data?.data?.length > 0 ? (
          <div className="p-4 flex flex-wrap gap-4">
            {data.data.map((service) => (
              <TechServiceCard key={service._id} {...service} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center text-gray-500 w-full mt-4">
            {t("No services found")}
          </div>
        )}
      </div>
      {isModalOpen && (
        <AddTechServiceModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TechServicesPage;
