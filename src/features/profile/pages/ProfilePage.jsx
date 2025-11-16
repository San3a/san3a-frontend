// import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import { User, Star, Mail, Briefcase } from "lucide-react";
import { usePastWorkQuery } from "../../profile/profileApi";
import { useEffect, useState } from "react";
import PastWork from "../components/PastWork";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const [pastwork, setPastWork] = useState([]);
  const {
    data: pastWork,
    isLoading,
    isError,
    error,
  } = usePastWorkQuery(user?._id);

  useEffect(() => {
    if (pastWork) {
      setPastWork(pastWork);
    }
  }, [pastWork]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.data?.message}</p>;
  return (
    <>
      <Navbar />

      <div className="w-full flex justify-center mt-10 px-4">
        <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8">
          <div className="flex items-center gap-6 border-b pb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-200 flex items-center justify-center">
              {user?.image?.url ? (
                <img
                  src={user.image.url}
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
                {user.role}
              </span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm flex flex-col items-center">
              <Star className="text-yellow-500 mb-2" />
              <h3 className="font-semibold text-lg">Rating</h3>
              <p className="text-xl font-bold">{user.rating}</p>
            </div>

            {user.role === "technician" && (
              <div className="bg-gray-50 p-5 rounded-xl shadow-sm flex flex-col items-center">
                <Briefcase className="text-green-600 mb-2" />
                <h3 className="font-semibold text-lg">Total Earnings</h3>
                <p className="text-xl font-bold">${user.totalEarning}</p>
              </div>
            )}

            <div className="bg-gray-50 p-5 rounded-xl shadow-sm flex flex-col items-center">
              <Mail className="text-blue-600 mb-2" />
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>

          {/* Role Based Content */}
          <div className="mt-10">
            {user.role === "technician" ? (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">
                  Technician Past Work
                </h2>

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
                      <PastWork key={item._id} item={item} />
                    ))}
                  </div>
                )}
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
