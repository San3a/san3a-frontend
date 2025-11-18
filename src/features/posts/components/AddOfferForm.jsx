import InputError from "../../../components/InputError";
import LoadingButton from "../../../components/LoadingButton";
import { toast } from "sonner";
import { BiSend } from "react-icons/bi";
import { useAddOfferToPostMutation } from "../postsApi";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

function AddOfferForm({ post }) {
  const { theme } = useTheme();
  const [createOffer, { reset: resetMutation }] = useAddOfferToPostMutation();
  const { t } = useTranslation();

  const {
    register: offerForm,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      await createOffer({
        postId: post._id,
        data: {
          message: data.text,
          price: data.price,
        },
      }).unwrap();

      toast.success(t("offerSubmittedSuccessfully"));
      reset();
      resetMutation();
    } catch (err) {
      toast.error(err?.data?.message || t("errorOccurred"));
    }
  };

  return (
    <div className="sticky top-0 z-10  border-b border-gray-200  shadow-sm pb-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 pt-4 flex gap-3 items-start"
      >
        <div className="shrink-0 pt-1">
          <img
            className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/20"
            src="https://plus.unsplash.com/premium_photo-1755882951408-b6d668ccca21?q=80&w=387&auto=format&fit=crop"
            alt="User"
          />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex gap-2 justify-start">
            <div className="flex-1">
              <textarea
                placeholder={t("writeAnOffer")}
                rows={2}
                className={`w-full border border-gray-300  ${
                  theme === "light" ? "bg-[#252728]" : "bg-gray-50"
                }  text-gray-900 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  theme === "light"
                    ? "placeholder:text-white"
                    : "placeholder:text-gray-400"
                } text-sm`}
                {...offerForm("text", { required: t("offerTextRequired") })}
              />
              {errors.text && <InputError message={errors.text.message} />}
            </div>

            <div className="w-28">
              <input
                type="text"
                placeholder={t("price")}
                className={`w-full border border-gray-300  ${
                  theme === "light" ? "bg-[#252728]" : "bg-gray-50"
                }  text-gray-900  rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === "light"
                    ? "placeholder:text-white"
                    : "placeholder:text-gray-400"
                } text-sm`}
                {...offerForm("price", {
                  required: t("offerPriceRequired"),
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/,
                    message: t("offerPriceMustBeNumber"),
                  },
                })}
              />
              {errors.price && <InputError message={errors.price.message} />}
            </div>

            <LoadingButton
              isBtnLoading={isSubmitting}
              disabled={!isValid || isSubmitting}
              title={<BiSend size={20} className="-rotate-45" />}
              width="42px"
              height="42px"
              borderRadius="4px"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddOfferForm;
