import { useTranslation } from "react-i18next";
import ExpandableText from "../../../components/ExpandableText";
import { useTheme } from "next-themes";
import isTextRTL from "../../../utils/isTextRTL";

function PostText({ post }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const titleDirection = isTextRTL(post.title) ? "rtl" : "ltr";
  const titleAlign = isTextRTL(post.title) ? "text-right" : "text-left";

  return (
    <>
      <h2
        dir={titleDirection}
        className={`mt-3 font-bold ${titleAlign} ${
          theme === "dark" ? "text-white" : "text-black ${}"
        }`}
      >
        {post.title}
      </h2>
      <ExpandableText
        maxLines={3}
        readMoreText={t("readMore")}
        readLessText={t("readLess")}
        textColor={theme === "dark" ? "text-white" : "text-black"}
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
