import { useTranslation } from "react-i18next";
import ExpandableText from "../../../components/ExpandableText";

function PostText({ post }) {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="mt-3 font-bold">{post.title}</h2>
      <ExpandableText
        maxLines={3}
        readMoreText={t("readMore")}
        readLessText={t("readLess")}
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
