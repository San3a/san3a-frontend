import { useState } from "react";
import { MdClose, MdLocalOffer } from "react-icons/md";
import PostMainContent from "./PostMainContent";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import InputError from "../../../components/InputError";

function PostOffersModal({ isOpen, onClose, images, setIndex }) {
  const { t } = useTranslation();

  const {
    register: offerForm,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  if (!isOpen) return null;

  const onSubmit = async (data) => {};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="font-semibold text-lg mx-auto">
            Yousef Mohamed's Post
          </h2>
          <MdClose
            size={24}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={onClose}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <PostMainContent
            images={images}
            setSelectedIndex={setIndex}
            isShowPostOffersBtnVisible={false}
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 border-t border-gray-100 flex gap-2"
        >
          <div className="flex flex-2 gap-2">
            <input
              type="text"
              placeholder={t("writeAnOffer")}
              className="w-[70%] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...offerForm("text", { required: true })}
            />
            <InputError message={errors.text?.message} />
            <input
              type="text"
              placeholder={t("writePrice")}
              className="w-[30%] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...offerForm("price", {
                required: true,
                pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
              })}
            />
            <InputError message={errors.price?.message} />
          </div>
          <button
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600"
            type="submit"
          >
            {t("send")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostOffersModal;
