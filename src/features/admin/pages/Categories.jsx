import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "../../../components/ui/sonner";
import { toast } from "sonner";
import Card from "../components/Card";

import {
  useGetAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../adminApi";

export default function Categories() {
  const { t } = useTranslation();

  const { data: categories, refetch } = useGetAdminCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    name: "",
    description: "",
    file: null,
  });

  const submitCreate = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    if (file) fd.append("images", file);

    try {
      await createCategory(fd).unwrap();
      setName("");
      setDescription("");
      setFile(null);
      refetch();
      toast.success(t("categoryCreated"));
    } catch (e) {
      console.error(e);
      toast.error(t("categoryCreateFailed"));
    }
  };

  const openEditModal = (cat) => {
    setEditData({
      _id: cat._id,
      name: cat.name,
      description: cat.description,
      file: null,
    });
    setEditModalOpen(true);
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", editData.name);
    fd.append("description", editData.description);
    if (editData.file) fd.append("images", editData.file);

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

  return (
    <div className="space-y-6">
      <Toaster />

      <h2 className="text-2xl font-semibold">{t("categories")}</h2>

      {/* Create Category */}
      <Card className="p-6" title={t("createCategory")}>
        <form
          onSubmit={submitCreate}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("name")}
            className="border p-3 rounded-xl"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("description")}
            className="border p-3 rounded-xl"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-3 rounded-xl"
          />
          <button className="col-span-full bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-700 transition cursor-pointer">
            {t("create")}
          </button>
        </form>
      </Card>

      {/* List Categories */}
      <Card className="p-6" title={t("allCategories")}>
        <ul className="space-y-4">
          {(categories || []).map((cat) => (
            <li
              key={cat._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border hover:shadow-sm transition"
            >
              {/* Image + Info */}
              <div className="flex items-center gap-4">
                {cat.images?.[0]?.url && (
                  <img
                    src={cat.images[0].url}
                    alt={t(`categoryNames.${cat.name}`, cat.name)}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                )}
                <div>
                  <div className="font-semibold">
                    {t(`categoryNames.${cat.name}`, cat.name)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t(`categoryDescriptions.${cat.name}`, cat.description)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => openEditModal(cat)}
                  className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700 cursor-pointer"
                >
                  {t("edit")}
                </button>
                <button className="px-4 py-2 rounded-lg bg-red-100 text-red-700 cursor-pointer">
                  {t("delete")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <h3 className="text-xl font-semibold mb-4">{t("editCategory")}</h3>

            <form onSubmit={submitUpdate} className="space-y-4">
              <input
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder={t("name")}
                className="border p-3 rounded-xl w-full"
              />
              <input
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                placeholder={t("description")}
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
