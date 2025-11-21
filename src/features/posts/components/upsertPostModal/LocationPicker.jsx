import { t } from "i18next";
import { toast } from "sonner";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

export default function LocationPicker({ coords, setCoords }) {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error(t("geolocation_not_supported"));
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords([longitude, latitude]);
        toast.success(t("locationSelected"));
        setIsLoadingLocation(false);
      },
      (err) => {
        console.error(`location error: ${err}`);
        toast.error(t("locationFailed"));
        setIsLoadingLocation(false);
      }
    );
  };

  return (
    <div className={"space-y-3 p-4 rounded-xl dark:bg-black bg-gray-50"}>
      <h3 className={"font-semibold dark:text-white text-gray-700"}>
        {t("location")}
      </h3>

      <button
        type="button"
        onClick={getLocation}
        disabled={isLoadingLocation}
        className={`w-full h-12 my-4 p-4 text-white rounded-md flex justify-center items-center gap-2 transition-colors duration-200 ${
          isLoadingLocation
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isLoadingLocation ? (
          t("gettingLocation")
        ) : (
          <>
            {t("useMyCurrentLocation")}
            {coords && <FaCheckCircle className="text-white text-lg" />}
          </>
        )}
      </button>

      {coords && !isLoadingLocation && (
        <p className="text-gray-700 text-sm flex items-center gap-1">
          <FaCheckCircle className="text-green-600" />
          {t("locationSelected")}
        </p>
      )}
    </div>
  );
}
