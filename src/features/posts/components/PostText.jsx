import { useTranslation } from "react-i18next";
import ExpandableText from "../../../components/ExpandableText";
import { useTheme } from "next-themes";

function PostText({ post }) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <>
      <h2
        className={`mt-3 font-bold ${
          theme === "light" ? "text-white" : "text-black"
        }`}
      >
        {post.title}
      </h2>
      <ExpandableText
        maxLines={3}
        readMoreText={t("readMore")}
        readLessText={t("readLess")}
        textColor={theme === "light" ? "text-white" : "text-black"}
      >
        {post.description}
      </ExpandableText>
      <h2 className="mt-3 font-semibold text-blue-600 flex flex-wrap gap-1">
        {post.tags.map((tag, i) => (
          <span key={i} dir="ltr">
            #{tag}
          </span>
        ))}
      </h2>
    </>
  );
}

export default PostText;
