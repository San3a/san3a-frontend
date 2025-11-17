import { useTranslation } from "react-i18next";
import { useGetPostOffersQuery } from "../postsApi";
import { useEffect, useState } from "react";
import OfferShimmer from "./OfferShimmer";

function PostOffer({ postId }) {
  const { data, isLoading, isError, error } = useGetPostOffersQuery(postId);
  const [offers, setOffers] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      setOffers(data?.data || []);
    }
  }, [data]);

  if (isLoading) {
    return Array.from({ length: 5 }).map((_, index) => {
      return <OfferShimmer key={index}></OfferShimmer>;
    });
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  return offers.length === 0 ? (
    <p className="text-gray-500 mt-8 text-center">{t("noOffersAvailable")}</p>
  ) : (
    offers.map((offer) => (
      <div className="mt-5">
        <div className="flex">
          <img
            className="h-8 w-8 bg-black rounded-full shrink-0"
            src="https://plus.unsplash.com/premium_photo-1755882951408-b6d668ccca21?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="w-full   bg-black/10 rounded-lg px-3 py-1 ms-2">
            <span className="font-semibold text-[16px]">
              {offer.technician.name}
            </span>
            <span className="font-bold text-gray-700 text-[14px]">
              .{offer.price}EGP
            </span>

            <p className="font-normal text-black">{offer.message}</p>
          </div>
        </div>

        <button className="text-blue-600 ms-10 font-bold hover:scale-102 transition-transform mt-2 cursor-pointer">
          {t("startChat")}
        </button>
      </div>
    ))
  );
}

export default PostOffer;
