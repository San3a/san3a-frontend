import Navbar from "../../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { User, Briefcase } from "lucide-react";
import {
  useAddPastWorkMutation,
  useGetReviewsQuery,
  usePastWorkQuery,
  useUpdateProfileMutation,
} from "../../profile/profileApi";
import { useEffect, useState } from "react";
import PastWork from "../components/PastWork";
import { setCredentials } from "../../auth/authSlice";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ProfileDetails from "../components/ProfileDetails";
// import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [pastwork, setPastWork] = useState([]);
  const {
    data: pastWork,
    isLoading,
    isError,
    error,
  } = usePastWorkQuery(user?._id);

  const [
    updateProfile,
    isLoadingUpdateProfile,
    isErrorUpdateProfile,
    UpdateProfile,
  ] = useUpdateProfileMutation();

  useEffect(() => {
    if (pastWork) {
      setPastWork(pastWork);
    }
  }, [pastWork]);

  useEffect(() => {
    if (isErrorUpdateProfile) {
      const msg =
        error?.data?.message ||
        error?.error ||
        "You must fill all the required fields";
      toast.error(msg);
    }
  }, [isErrorUpdateProfile, UpdateProfile]);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.image?.url || null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImage(URL.createObjectURL(file));
  };

  const handleSaveUpdatingUserData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const updatedUser = await updateProfile(formData).unwrap();

    dispatch(
      setCredentials({
        user: updatedUser?.data?.user,
        token,
      })
    );

    setOpen(false);
  };

  const [addOpen, setAddOpen] = useState(false);

  const [pwTitle, setPwTitle] = useState("");
  const [pwDesc, setPwDesc] = useState("");
  const [pwImages, setPwImages] = useState([]);
  const [pwDate, setPwDate] = useState("");
  const [pwCustomer, setPwCustomer] = useState("");

  const [createPastWork] = useAddPastWorkMutation();

  const handlePastWorkImages = (e) => {
    setPwImages([...e.target.files]);
  };

  const handlePastWorkSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", pwTitle);
    formData.append("description", pwDesc);
    formData.append("dateCompleted", pwDate);
    formData.append("customerName", pwCustomer);

    pwImages.forEach((img) => {
      formData.append("images", img);
    });

    if (!pwTitle || !pwDesc || !pwImages) {
      toast.error(t("Please fill in all fields"));
      return;
    }

    const res = await createPastWork(formData).unwrap();

    console.log("FORMDATA SENT:", res);
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    toast.success(t("Past work added successfully"));
    setAddOpen(false);
  };

  const { data: reviews } = useGetReviewsQuery(user._id);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.data?.message}</p>;
  return (
    <>
      <Navbar />

      <div className="w-full flex justify-center mt-10 px-4">
        <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8">
          {/* Profile Header */}
          <div className="flex items-center gap-6 border-b pb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-200 flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={40} className="text-blue-700" />
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold capitalize">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <span className="px-3 py-1 mt-2 inline-block text-sm bg-blue-100 text-blue-600 rounded-full">
                {t(`${user.role}`)}
              </span>

              {/* Edit Button */}
              <button
                onClick={() => setOpen(true)}
                className="ml-4 mx-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                {t("Edit Profile")}
              </button>
            </div>
          </div>

          {/* Modal */}
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white w-96 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">{t("Edit Profile")}</h2>

                {/* Name */}
                <label className="block text-sm font-medium mb-1">
                  {t("Name")}
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mb-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                {/* Email */}
                <label className="block text-sm font-medium mb-1">
                  {t("Email")}
                </label>

                <input
                  type="email"
                  className="w-full p-2 border rounded-md mb-3"
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
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-md border"
                  >
                    {t("Cancel")}
                  </button>

                  <button
                    onClick={handleSaveUpdatingUserData}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {t("Save")}
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
              <div className="mt-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{t("My Past Work")}</h2>

                  <button
                    onClick={() => setAddOpen(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                  >
                    + {t("Add Past Work")}
                  </button>
                </div>

                {addOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white w-96 rounded-xl p-6 shadow-lg">
                      <h2 className="text-xl font-bold mb-4">
                        {t("Add Past Work")}
                      </h2>

                      {/* Title */}
                      <label className="block text-sm font-medium mb-1">
                        {t("Title")}*
                      </label>
                      <input
                        className="w-full p-2 border rounded-md mb-3"
                        value={pwTitle}
                        onChange={(e) => setPwTitle(e.target.value)}
                      />

                      {/* Description */}
                      <label className="block text-sm font-medium mb-1">
                        {t("Description")}*
                      </label>
                      <textarea
                        className="w-full p-2 border rounded-md mb-3"
                        rows="3"
                        value={pwDesc}
                        onChange={(e) => setPwDesc(e.target.value)}
                      />

                      {/* Images */}
                      <label className="block text-sm font-medium mb-1">
                        {t("Images")}*
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePastWorkImages}
                        className="mb-3"
                      />

                      {/* Date Completed */}
                      <label className="block text-sm font-medium mb-1">
                        {t("Date Completed")}
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded-md mb-3"
                        value={pwDate}
                        onChange={(e) => setPwDate(e.target.value)}
                      />

                      {/* Customer Name */}
                      <label className="block text-sm font-medium mb-1">
                        {t("Customer Name")}
                      </label>
                      <input
                        className="w-full p-2 border rounded-md mb-3"
                        value={pwCustomer}
                        onChange={(e) => setPwCustomer(e.target.value)}
                      />

                      {/* Buttons */}
                      <div className="flex justify-end gap-3 mt-4">
                        <button
                          onClick={() => setAddOpen(false)}
                          className="px-4 py-2 rounded-md border"
                        >
                          {t("Cancel")}
                        </button>

                        <button
                          onClick={handlePastWorkSave}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          {t("Save")}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {pastWork?.data?.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Briefcase
                      size={48}
                      className="mx-auto text-gray-300 mb-4"
                    />
                    <p className="text-gray-500 text-lg font-semibold">
                      No past work uploaded yet.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Your completed projects will appear here
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastWork.data.map((item) => (
                      //   <Link to={`/past-work/${item._id}`} key={item._id}>
                      <PastWork item={item} key={item._id} />
                      //   </Link>
                    ))}
                  </div>
                )}

                <div className="mt-10">
                  <h2 className="text-2xl font-bold mb-4">{t("Reviews")}</h2>

                  {reviews?.data?.length === 0 ? (
                    <p className="text-gray-500">{t("No reviews yet")}</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.data.map((r) => (
                        <div
                          key={r._id}
                          className="p-4 border rounded-lg shadow-sm bg-gray-50"
                        >
                          <div className="flex justify-between">
                            <p className="font-semibold">{r.user.name}</p>
                            <p className="text-yellow-600 font-bold">
                              {r.rating} ⭐
                            </p>
                          </div>

                          <p className="mt-2 text-gray-700">{r.review}</p>

                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(r.createdAt).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6 bg-green-50 rounded-xl">
                <h2 className="text-xl font-bold mb-2">User Dashboard</h2>
                <p className="text-gray-600">
                  View your requests, manage your account, and check status
                  updates.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
