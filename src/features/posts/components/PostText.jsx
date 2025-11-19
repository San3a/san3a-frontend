import { useTranslation } from "react-i18next";
import ExpandableText from "../../../components/ExpandableText";
import isTextRTL from "../../../utils/isTextRTL";

function PostText({ post }) {
  const { t } = useTranslation();
  const titleDirection = isTextRTL(post.title) ? "rtl" : "ltr";
  const titleAlign = isTextRTL(post.title) ? "text-right" : "text-left";

  return (
    <>
      <h2
        dir={titleDirection}
        className={`mt-3 font-bold ${titleAlign} text-black dark:text-white`}
      >
        {post.title}
      </h2>
      <ExpandableText
        maxLines={3}
        readMoreText={t("readMore")}
        readLessText={t("readLess")}
        textColor="text-black dark:text-white"
      >
        {post.description}
      </ExpandableText>
      <h2 className="mt-3 font-semibold text-blue-600 flex flex-wrap gap-1 mb-2">
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
