import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputError from "@/components/InputError";
import LoadingButton from "@/components/LoadingButton";

import ImageUploader from "./ImageUploader";
import TagInputList from "./TagInputList";
import LocationPicker from "./LocationPicker";
import { useTranslation } from "react-i18next";
import { useCreatePostMutation, useUpdatePostMutation } from "../../postsApi";
import { toast } from "sonner";

const categories = [
  "Plumbing",
  "Electrical",
  "AC Repair",
  "Painting",
  "Carpentry",
];

export default function PostForm({ post, onClose }) {
  const isEdit = Boolean(post);
  const { t } = useTranslation();
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const [existingImages, setExistingImages] = useState(post?.images || []);
  const [newImages, setNewImages] = useState([]);
  const [coords, setCoords] = useState(post?.location?.coordinates || null);
  const [tags, setTags] = useState(post?.tags || []);

  useEffect(() => {
    if (isEdit) {
      reset({
        title: post.title,
        description: post.description,
        category: post.category,
        address: post.location?.address || "",
      });
    }
  }, [post]);

  const submit = async (data) => {
    if (existingImages.length === 0 && newImages.length === 0) {
      toast.error(t("selectAtLeastOneImage"));
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);

    tags.forEach((t) => formData.append("tags[]", t.toLowerCase()));

    // Only append new image files for multer to process
    newImages.forEach((imgObj) => {
      formData.append("images", imgObj.file);
    });

    // For edits, send existing image URLs so backend knows which to keep
    if (isEdit && existingImages.length > 0) {
      existingImages.forEach((img) => {
        formData.append("existingImages[]", img.public_id);
      });
    }

    if (coords) {
      formData.append("location[type]", "Point");
      formData.append("location[coordinates][]", coords[0]);
      formData.append("location[coordinates][]", coords[1]);
      formData.append("location[address]", data.address || "");
    }

    console.log("FormData content:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      if (isEdit) {
        await updatePost({ postId: post._id, data: formData }).unwrap();
        console.log("SUCCESS: Post updated successfully");
        toast.success(t("postUpdatedSuccessfully"));
      } else {
        await createPost(formData).unwrap();
        console.log("SUCCESS: Post created successfully");
        toast.success(t("postCreatedSuccessfully"));
      }

      reset();
      onClose();
    } catch (err) {
      console.log("ERROR while creating/updating:", err);
      toast.error(t("errorOccurred"));
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submit)}>
      <div>
        <input
          {...register("title", {
            required: t("titleRequired"),
            minLength: { value: 5, message: t("postTitleMinLength") },
            maxLength: { value: 100, message: t("postTitleMaxLength") },
          })}
          placeholder={t("title")}
          className="w-full border border-gray-300 p-3 rounded-xl"
        />
        <InputError message={errors.title?.message} />
      </div>

      <div>
        <textarea
          {...register("description", {
            required: t("postDescriptionRequired"),
            minLength: { value: 10, message: t("postDescriptionMinLength") },
          })}
          placeholder={t("writeSomething")}
          className="w-full border border-gray-300 p-3 rounded-xl h-28 resize-none"
        />
        <InputError message={errors.description?.message} />
      </div>

      <select
        {...register("category", { required: t("postCategoryRequired") })}
        className="w-full border border-gray-300 p-3 rounded-xl"
      >
        <option value="">{t("selectCategory")}</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <ImageUploader
        existingImages={existingImages}
        setExistingImages={setExistingImages}
        newImages={newImages}
        setNewImages={setNewImages}
      />

      <TagInputList tags={tags} setTags={setTags} />

      <LocationPicker
        coords={coords}
        setCoords={setCoords}
        register={register}
      />

      <div className="flex justify-center items-center gap-3 pt-2 mx-auto">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 bg-gray-200 rounded-xl w-[30%] h-14 cursor-pointer"
        >
          {t("cancel")}
        </button>

        <LoadingButton
          isBtnLoading={isSubmitting}
          disabled={
            !isValid ||
            (!coords && !post?.location) ||
            (existingImages.length === 0 && newImages.length === 0)
          }
          title={t("publish")}
          width="70%"
        />
      </div>
    </form>
  );
}
