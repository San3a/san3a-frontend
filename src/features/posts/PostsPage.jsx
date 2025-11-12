import { useTranslation } from "react-i18next";
import ExpandableText from "../../components/ExpandableText";
import PostHeader from "./components/PostHeader";

function PostsPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <PostHeader />
        <ExpandableText
          maxLines={3}
          readMoreText={t("readMore")}
          readLessText={t("readLess")}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus
          sapiente voluptate aperiam mollitia magnam tenetur rerum dolorum
          officia soluta sequi voluptatem provident consectetur minima dolore,
          in repudiandae libero et aspernatur!
        </ExpandableText>
      </div>
    </div>
  );
}

export default PostsPage;
