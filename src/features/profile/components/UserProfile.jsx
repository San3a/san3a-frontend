import React, { useState } from "react";
import { useGetPostsQuery } from "../profileApi";
import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import ImageCarousel from "./ImageCarousel";
import AddPostModal from "./AddPostModal ";

const UserProfile = () => {
  const { data: posts, isLoading, isError, refetch } = useGetPostsQuery();
  const { t } = useTranslation();
  const [addOpen, setAddOpen] = useState(false);

  if (isLoading)
    return (
      <p className="text-center py-10 text-muted-foreground dark:text-muted-foreground">
        {t("Loading...")}
      </p>
    );

  if (isError) {
    return (
      <p className="text-center py-10 text-red-500">
        {t("Failed to load posts.")}
      </p>
    );
  }

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold mb-6 text-foreground dark:text-foreground tracking-tight">
          {t("My Posts")}
        </h2>
        <button
          onClick={() => setAddOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          + {t("Add Post")}
        </button>
        <AddPostModal
          open={addOpen}
          refetch={refetch}
          onClose={() => setAddOpen(false)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.data?.map((post) => (
          <div
            key={post._id}
            className="bg-card text-card-foreground rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            {post.images?.length > 0 && (
              <div className="relative">
                <ImageCarousel images={post.images} />

                {/* Status Badge */}
                <span
                  className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full text-white shadow-md
                    ${
                      post.status === "open"
                        ? "bg-green-600"
                        : "bg-gray-500 dark:bg-gray-600"
                    }`}
                >
                  {t(`${post.status}`)}
                </span>
              </div>
            )}

            {/* Content */}
            <div className="p-5">
              {/* Title */}
              <h2 className="text-lg font-semibold mb-2 line-clamp-1 text-foreground dark:text-foreground">
                {post.title}
              </h2>

              {/* Description */}
              <p className="text-sm mb-3 line-clamp-2 leading-relaxed text-muted-foreground dark:text-muted-foreground">
                {post.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* User */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={post.user?.image?.url}
                  alt="User"
                  className="w-9 h-9 rounded-full object-cover border border-border"
                />
                <span className="text-sm font-medium text-foreground dark:text-foreground">
                  {post.user?.name}
                </span>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-xs text-muted-foreground dark:text-muted-foreground border-t border-border pt-4">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
