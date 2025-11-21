import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AvailabilityPicker = ({ availabilities, id }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  availabilities.forEach((a) => console.log(a));

  const groupedByDay = availabilities.reduce((acc, dayObj) => {
    const dayKey = new Date(dayObj.day).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    if (!acc[dayKey]) acc[dayKey] = [];
    acc[dayKey].push(...(dayObj.slots || []));

    return acc;
  }, {});

  const noDates = Object.keys(groupedByDay).length === 0;

  const handleCheckout = () => {
    // if (!selectedTime) return;
    navigate(`/checkout/${id}`);
  };

  const formatDayCard = (dayKey) => {
    const date = new Date(dayKey);
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: date.toLocaleDateString("en-US", { day: "2-digit" }),
    };
  };

  return (
    <>
      {noDates ? (
        <div className="text-center text-gray-500 py-6">
          {t("No available dates at the moment")}
        </div>
      ) : (
        <div className="p-3">
          <h2 className="font-semibold mb-2">{t("Select Date")}</h2>

          <div className="flex gap-3 mb-6">
            {Object.entries(groupedByDay).map(([dayKey, slots]) => {
              const f = formatDayCard(dayKey);

              return (
                <button
                  key={dayKey}
                  onClick={() => {
                    setSelectedDay({ key: dayKey, slots });
                    setSelectedTime(null);
                  }}
                  className={`
                    flex flex-col items-center px-4 py-2 rounded-xl border transition-all
                    ${
                      selectedDay?.key === dayKey
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-100 text-black border-gray-300"
                    }
                  `}
                >
                  <span className="text-sm">{f.weekday}</span>
                  <span className="text-lg font-bold">{f.dayNum}</span>
                </button>
              );
            })}
          </div>

          {selectedDay && (
            <>
              <h2 className="font-semibold mb-2">{t("Select Time")}</h2>

              <div className="flex flex-wrap gap-3 mb-6">
                {selectedDay.slots.map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() => setSelectedTime(slot)}
                    disabled={slot.isBooked}
                    className={`
                      px-4 py-2 rounded-xl border text-sm transition-all
                      ${
                        selectedTime?._id === slot._id
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-100 text-black border-gray-300"
                      }
                      ${slot.isBooked ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {slot.start} - {slot.end}
                  </button>
                ))}
              </div>
            </>
          )}

          <button
            // disabled={!selectedTime}
            onClick={handleCheckout}
            className={`
              w-full py-3 rounded-xl text-white font-semibold transition-all
              ${
                selectedTime
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-300 cursor-not-allowed"
              }
            `}
          >
            {t("Proceed to Checkout")}
          </button>
        </div>
      )}
    </>
  );
};

export default AvailabilityPicker;
