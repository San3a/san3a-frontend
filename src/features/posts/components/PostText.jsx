import { useTranslation } from "react-i18next";
import ExpandableText from "../../../components/ExpandableText";

function PostText() {
  const { t } = useTranslation();

  return (
    <ExpandableText
      maxLines={3}
      readMoreText={t("readMore")}
      readLessText={t("readLess")}
      className="mt-3"
    >
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus
      sapiente voluptate aperiam mollitia magnam tenetur rerum dolorum officia
      soluta sequi voluptatem provident consectetur minima dolore, in
      repudiandae libero et aspernatur!
    </ExpandableText>
  );
}

export default PostText;
