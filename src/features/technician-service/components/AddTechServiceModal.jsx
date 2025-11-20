import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useAddTechServiceMutation } from "../techServiceApi";
import { toast } from "sonner";
import { validateFields } from "./validate";

export const AddTechServiceModal = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const categories = useSelector((state) => state.category.categories);
  const [addTechService] = useAddTechServiceMutation();
  const isRTL = i18n.dir() === "rtl";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    setImages((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const handleCreate = async () => {
    const validationErrors = validateFields({
      title,
      desc,
      price,
      category,
      images,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("price", price);
      formData.append("category", category);

      images.forEach((file) => formData.append("images", file));
      await addTechService(formData).unwrap();
      toast.success("Service created successfully");
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create service");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-white dark:bg-gray-800 p-6 w-full max-w-md relative z-10 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-5">{t("Add New Service")}</h2>

        <div className="space-y-4">
          <div>
            <input
              className="w-full border rounded p-2 bg-transparent"
              type="text"
              placeholder={t("title")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <textarea
              className="w-full border rounded p-2 bg-transparent"
              placeholder={t("description")}
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <input
              className="w-full border rounded p-2 bg-transparent"
              type="number"
              placeholder={t("Price")}
              value={price}
              onChange={(e) =>
                e.target.value < 0 ? setPrice("") : setPrice(e.target.value)
              }
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <select
              className="bg-white dark:bg-gray-800 w-full border rounded p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">{t("Select Category")}</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {isRTL ? cat.nameAr : cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <input
              id="serviceImages"
              type="file"
              multiple
              onChange={handleImageUpload}
            />

            {errors.images && (
              <p className="text-red-500 text-sm mt-1">{errors.images}</p>
            )}
          </div>

          <Button className="w-full" onClick={handleCreate}>
            {t("Submit")}
          </Button>
        </div>
      </div>
    </div>
  );
};
