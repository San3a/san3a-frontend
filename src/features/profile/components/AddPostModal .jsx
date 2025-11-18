import React, { useState } from "react";
import { X } from "lucide-react";
import { useCreatePostMutation } from "../profileApi";
import { useGetAllCategoriesQuery } from "../../category/categoryApi";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const AddPostModal = ({ open, onClose, refetch }) => {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const { data: categoriesRes } = useGetAllCategoriesQuery();
  const categories = categoriesRes?.data || [];
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({
    type: "Point",
    coordinates: [0, 0],
    address: "",
  });

  if (!open) return null;

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleAddTag = () => {
    if (
      tagInput.trim() !== "" &&
      !tags.includes(tagInput.trim().toLowerCase())
    ) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
    }
    setTagInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    // Location data
    formData.append("location[type]", location.type);
    formData.append("location[address]", location.address);
    formData.append("location[coordinates][]", location.coordinates[0]);
    formData.append("location[coordinates][]", location.coordinates[1]);

    // Tags array
    tags.forEach((t) => formData.append("tags[]", t));
    // Images array
    images.forEach((img) => formData.append("images", img));

    try {
      await createPost(formData).unwrap();
      toast.success("Post added successfully!");
      refetch();
      onClose(); // Close on success
    } catch (err) {
      toast.error(err?.data?.message || "Error submitting form");
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50
                 bg-card/50 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-post-title"
    >
      {/* UPDATED: Changed w-96 to max-w-xl and added w-full for responsiveness */}
      <div className="w-full max-w-xl rounded-xl p-6 shadow-lg bg-card text-card-foreground border border-border overflow-auto max-h-[95vh]">
        {/* Title and Close Button Container */}
        <div className="flex justify-between items-center mb-4">
          <h2 id="add-post-title" className="text-xl font-bold">
            {t("Add New Post")}
          </h2>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground dark:hover:text-white p-1"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <label className="block text-sm font-medium mb-1">{t("Title")}</label>
          <input
            type="text"
            placeholder="Post Title"
            className="w-full p-2 border rounded-md mb-3 bg-background text-foreground border-border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Description */}
          <label className="block text-sm font-medium mb-1">
            {t("Description")}
          </label>
          <textarea
            placeholder="Describe your post"
            className="w-full p-2 border rounded-md mb-3 bg-background text-foreground border-border"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Category */}
          <label className="block text-sm font-medium mb-1">
            {t("Category")}
          </label>
          <select
            className="w-full p-2 border rounded-md mb-3 bg-background text-foreground border-border"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Tags */}
          <label className="block text-sm font-medium mb-1">{t("Tags")}</label>
          <div className="mb-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tag"
                className="flex-1 p-2 border rounded-md bg-background text-foreground border-border"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                } // Allow Enter to add tag
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {t("Add")}
              </button>
            </div>
            <div className="flex gap-2 flex-wrap mt-2">
              {tags.map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Images */}
          <label className="block text-sm font-medium mb-1">
            {t("Images")}
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
            className="w-full mb-3"
          />

          {/* Location Address */}
          <label className="block text-sm font-medium mb-1">
            {t("Address")}
          </label>
          <input
            type="text"
            placeholder="Address/Location"
            className="w-full p-2 border rounded-md mb-3 bg-background text-foreground border-border"
            onChange={(e) =>
              setLocation({ ...location, address: e.target.value })
            }
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-border text-foreground hover:bg-muted"
              aria-label="Cancel"
            >
              {t("Cancel")}
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Create Post"
            >
              {isLoading ? t("Saving") + "..." : t("Create Post")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
