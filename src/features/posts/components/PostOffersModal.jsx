import { MdClose, MdLocalOffer } from "react-icons/md";
import PostMainContent from "./PostMainContent";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import InputError from "../../../components/InputError";
import LoadingButton from "../../../components/LoadingButton";
import { useAddOfferToPostMutation } from "../postsApi";
import { toast } from "sonner";
import { BiSend } from "react-icons/bi";

function PostOffersModal({
  isOpen,
  onClose,
  post,
  setIndex,
  setSelectedPostDetails,
}) {
  const [createOffer, { reset }] = useAddOfferToPostMutation();
  const { t } = useTranslation();

  const {
    register: offerForm,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });
  if (!isOpen) return null;

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
    } catch (err) {
      toast.error(err?.data?.message || t("errorOccurred"));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="font-semibold text-lg mx-auto">Post</h2>
          <MdClose
            size={24}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={onClose}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <PostMainContent
            post={post}
            setSelectedIndex={setIndex}
            setSelectedPostDetails={setSelectedPostDetails}
            isShowPostOffersBtnVisible={false}
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 border-t border-gray-100 bg-transparent flex gap-2 justify-center items-center"
        >
          <textarea
            type="text"
            placeholder={t("writeAnOffer")}
            className="w-[70%] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...offerForm("text", { required: t("offerTextRequired") })}
          />
          <InputError message={errors.text?.message} />
          <input
            type="text"
            placeholder={t("writePrice")}
            className="w-[30%] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
            {...offerForm("price", {
              required: t("offerPriceRequired"),
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message: t("offerPriceMustBeNumber"),
              },
            })}
          />
          <InputError message={errors.price?.message} />
          <LoadingButton
            isBtnLoading={isSubmitting}
            disabled={!isValid}
            title={<BiSend size={25} className="-rotate-45" />}
            width="min-content"
            borderRadius="0"
            height="3rem"
            style={{ margin: "1rem", padding: "1rem" }}
          />
        </form>
      </div>
    </div>
  );
}

export default PostOffersModal;
