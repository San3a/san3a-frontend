import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";
import { useUpdateOfferMutation } from "../postsApi";
import InputError from "../../../components/InputError";
import LoadingButton from "../../../components/LoadingButton";

function UpdateOfferModal({ isOpen, onClose, offer, postId }) {
  const { t } = useTranslation();
  const [updateOffer] = useUpdateOfferMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      message: offer?.message || "",
      price: offer?.price || "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      reset({
        message: offer?.message || "",
        price: offer?.price || "",
      });
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, offer, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      await updateOffer({
        offerId: offer._id,
        postId: postId,
        data: {
          message: data.message,
          price: data.price,
        },
      }).unwrap();

      toast.success(t("offerUpdatedSuccessfully"));
      reset();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || t("errorOccurred"));
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="rounded-2xl w-full max-w-md shadow-2xl bg-white dark:bg-[#252728]">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t("updateOffer")}
            </h2>
            <MdClose
              size={24}
              className="cursor-pointer text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={onClose}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t("offer")}
              </label>
              <textarea
                rows={3}
                placeholder={t("writeAnOffer")}
                className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                {...register("message", { required: t("offerTextRequired") })}
              />
              {errors.message && (
                <InputError message={errors.message.message} />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t("price")}
              </label>
              <input
                type="text"
                placeholder={t("price")}
                className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                {...register("price", {
                  required: t("offerPriceRequired"),
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/,
                    message: t("offerPriceMustBeNumber"),
                  },
                })}
              />
              {errors.price && <InputError message={errors.price.message} />}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl font-medium transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300
                    dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                {t("cancel")}
              </button>

              <LoadingButton
                isBtnLoading={isSubmitting}
                disabled={!isValid || isSubmitting}
                title={t("update")}
                width="50%"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateOfferModal;
