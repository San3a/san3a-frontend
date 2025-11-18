import { t } from "i18next";
import { toast } from "sonner";
import { FaCheckCircle } from "react-icons/fa";
import LoadingButton from "../../../../components/LoadingButton";
import { useTheme } from "next-themes";

export default function LocationPicker({ coords, setCoords }) {
  const { theme } = useTheme();
  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error(t("geolocation_not_supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords([longitude, latitude]);
        toast.success(t("locationSelected"));
      },
      (err) => {
        console.log(`location error: ${err}`);
        toast.error(t("locationFailed"));
      }
    );
  };

  return (
    <div
      className={`space-y-3 p-4 rounded-xl ${
        theme === "dark" ? "" : "bg-gray-50"
      }`}
    >
      <h3
        className={`font-semibold ${
          theme === "dark" ? "text-white" : "text-gray-700"
        }`}
      >
        {t("location")}
      </h3>

      <LoadingButton
        onClick={getLocation}
        submitForm={false}
        title={
          <div className="flex justify-center items-center gap-2">
            {t("useMyCurrentLocation")}
            {coords && <FaCheckCircle className="text-white text-lg" />}
          </div>
        }
        height="3rem"
        style={{
          margin: "1rem 0",
          padding: "1rem",
          backgroundColor: "green",
        }}
      />

      {coords && (
        <p className="text-gray-700 text-sm flex items-center gap-1">
          <FaCheckCircle className="text-green-600" />
          {t("locationSelected")}
        </p>
      )}
    </div>
  );
}
