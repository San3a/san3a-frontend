import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "../../../components/ui/sonner";
import { toast } from "sonner";
import Card from "../components/Card";

import {
  useGetAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../adminApi";

export default function Categories() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { data: categories, refetch } = useGetAdminCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [file, setFile] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    name: "",
    nameAr: "",
    description: "",
    descriptionAr: "",
    file: null,
  });

  // Create category
  const submitCreate = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    fd.append("name", name);
    fd.append("nameAr", nameAr);
    fd.append("description", description);
    fd.append("descriptionAr", descriptionAr);
    if (file) fd.append("image", file);

    try {
      await createCategory(fd).unwrap();
      setName("");
      setNameAr("");
      setDescription("");
      setDescriptionAr("");
      setFile(null);
      refetch();
      toast.success(t("categoryCreated"));
    } catch (e) {
      console.error(e);
      toast.error(t("categoryCreateFailed"));
    }
  };

  // Open Edit Modal
  const openEditModal = (cat) => {
    setEditData({
      _id: cat._id,
      name: cat.name,
      nameAr: cat.nameAr || "",
      description: cat.description,
      descriptionAr: cat.descriptionAr || "",
      file: null,
    });
    setEditModalOpen(true);
  };

  // Update category
  const submitUpdate = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    fd.append("name", editData.name);
    fd.append("nameAr", editData.nameAr);
    fd.append("description", editData.description);
    fd.append("descriptionAr", editData.descriptionAr);
    if (editData.file) fd.append("image", editData.file);

    try {
      await updateCategory({ id: editData._id, data: fd }).unwrap();
      setEditModalOpen(false);
      refetch();
      toast.success(t("categoryUpdated"));
    } catch (e) {
      console.error(e);
      toast.error(t("categoryUpdateFailed"));
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      refetch();
      toast.success(t("categoryDeleted"));
    } catch (e) {
      console.error(e);
      toast.error(t("categoryDeleteFailed"));
    }
  };

  return (
    <div className="space-y-6">
      <Toaster />

      <h2 className="text-2xl font-semibold">{t("categories")}</h2>

      {/* Create Category */}
      <Card className="p-6" title={t("createCategory")}>
        <form
          onSubmit={submitCreate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("nameEn")}
            className="border p-3 rounded-xl"
          />

          <input
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            placeholder={t("nameAr")}
            className="border p-3 rounded-xl"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("descriptionEn")}
            className="border p-3 rounded-xl"
          />

          <input
            value={descriptionAr}
            onChange={(e) => setDescriptionAr(e.target.value)}
            placeholder={t("descriptionAr")}
            className="border p-3 rounded-xl"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-3 rounded-xl col-span-full"
          />

          <button className="col-span-full bg-slate-800 text-white py-3 rounded-xl cursor-pointer">
            {t("create")}
          </button>
        </form>
      </Card>

      {/* Category List */}
      <Card className="p-6" title={t("allCategories")}>
        <ul className="space-y-4">
          {(categories || []).map((cat) => {
            const title = isArabic ? cat.nameAr : cat.name;
            const desc = isArabic ? cat.descriptionAr : cat.description;

            return (
              <li
                key={cat._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border"
              >
                <div className="flex items-center gap-4">
                  {cat.images?.[0]?.url && (
                    <img
                      src={cat.images[0].url}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  )}

                  <div className={`${isArabic ? "text-right" : "text-left"}`}>
                    <div className="font-semibold">{title}</div>
                    <div className="text-sm text-gray-500">{desc}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="px-4 py-2 rounded-lg bg-yellow-100"
                  >
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="px-4 py-2 rounded-lg bg-red-100"
                  >
                    {t("delete")}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">{t("editCategory")}</h3>

            <form onSubmit={submitUpdate} className="space-y-4">
              <input
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder={t("nameEn")}
                className="border p-3 rounded-xl w-full"
              />

              <input
                value={editData.nameAr}
                onChange={(e) =>
                  setEditData({ ...editData, nameAr: e.target.value })
                }
                placeholder={t("nameAr")}
                className="border p-3 rounded-xl w-full"
              />

              <input
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                placeholder={t("descriptionEn")}
                className="border p-3 rounded-xl w-full"
              />

              <input
                value={editData.descriptionAr}
                onChange={(e) =>
                  setEditData({ ...editData, descriptionAr: e.target.value })
                }
                placeholder={t("descriptionAr")}
                className="border p-3 rounded-xl w-full"
              />

              <input
                type="file"
                onChange={(e) =>
                  setEditData({ ...editData, file: e.target.files[0] })
                }
                className="border p-3 rounded-xl w-full"
              />

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200"
                >
                  {t("cancel")}
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white"
                >
                  {t("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
