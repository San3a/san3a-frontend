import Navbar from "../../../components/Navbar";
import { User } from "lucide-react";

import ProfileDetails from "../components/ProfileDetails";
import TechnicanProfile from "../components/TechnicanProfile";
import UserProfile from "../components/UserProfile";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCredentials } from "../../auth/authSlice";
import { useUpdateProfileMutation } from "../profileApi";
import { toast } from "sonner";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [image, setImage] = useState(user?.image?.url || null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [imageFile, setImageFile] = useState(null);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  if (!user) return <div>{t("No User found!")}</div>;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImage(URL.createObjectURL(file));
  };

  const handleCloseModal = () => {
    setImage(user?.image?.url || null);
    setName(user?.name || "");
    setEmail(user?.email || "");
    setImageFile(null);
    setOpen(false);
  };

  const handleSaveUpdatingUserData = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error(t("Please fill in all required fields"));
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (imageFile) formData.append("image", imageFile);

    try {
      const updatedUser = await updateProfile(formData).unwrap();
      dispatch(
        setCredentials({
          user: updatedUser?.data?.user,
          token,
        })
      );
      toast.success(t("Profile updated successfully"));
      setOpen(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error(t("Failed to update your profile"));
    }
  };

  return (
    <>
      <Navbar />

      <div className="w-4/5 mx-auto mt-10 px-4">
        <div className="w-full shadow-xl rounded-2xl p-8 bg-card text-card-foreground border border-border">
          {/* Profile Header */}
          <div className="flex items-center gap-6 border-b border-border pb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-blue-200 dark:bg-blue-800">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={40} className="text-blue-700 dark:text-blue-300" />
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold capitalize">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <span className="px-3 py-1 mt-2 inline-block text-sm bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-blue-100 rounded-full">
                {t(`${user.role}`)}
              </span>

              <button
                onClick={() => setOpen(true)}
                aria-label={t("Edit Profile")}
                className="ml-4 mx-2 px-4 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 text-sm"
              >
                {t("Edit Profile")}
              </button>
            </div>
          </div>

          {/* Edit Profile Modal */}
          {open && (
            <div
              className="fixed inset-0 flex justify-center items-center z-50
               bg-card/70 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-profile-title"
            >
              <div className="w-96 rounded-xl p-6 shadow-lg bg-card text-card-foreground border border-border overflow-auto max-h-[90vh]">
                <h2 id="edit-profile-title" className="text-xl font-bold mb-4">
                  {t("Edit Profile")}
                </h2>

                {/* Name */}
                <label className="block text-sm font-medium mb-1">
                  {t("Name")}
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mb-3 bg-background text-foreground border-border"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                {/* Email */}
                <label className="block text-sm font-medium mb-1">
                  {t("Email")}
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md mb-3 bg-background text-foreground border-border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Image Upload */}
                <label className="block text-sm font-medium mb-1">
                  {t("Profile Image")}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full mb-3"
                  onChange={handleImageChange}
                />

                {/* Preview */}
                {image && (
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                    <img src={image} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-md border"
                    aria-label={t("Cancel")}
                  >
                    {t("Cancel")}
                  </button>

                  <button
                    onClick={handleSaveUpdatingUserData}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={t("Save")}
                  >
                    {isUpdating ? t("Saving...") : t("Save")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Profile Details */}
          <ProfileDetails />

          {/* Role Based Content */}
          <div className="mt-10">
            {user.role === "technician" ? (
              <TechnicanProfile />
            ) : (
              <UserProfile />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
