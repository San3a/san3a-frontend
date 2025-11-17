import { useTranslation } from "react-i18next";

export default function TagInputList({ tags, setTags }) {
  const { t } = useTranslation();

  const addTag = () => setTags([...tags, ""]);
  const update = (i, val) => {
    const t = [...tags];
    t[i] = val;
    setTags(t);
  };
  const remove = (i) => {
    setTags(tags.filter((_, x) => x !== i));
  };

  return (
    <div className="space-y-2">
      {tags.map((tag, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={tag}
            onChange={(e) => update(i, e.target.value)}
            className="border border-gray-300 p-2 rounded-xl flex-1"
          />
          <button
            type="button"
            className="px-3 py-1 bg-red-500 text-white rounded-xl"
            onClick={() => remove(i)}
          >
            ×
          </button>
        </div>
      ))}

      {tags.length < 10 && (
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2 bg-gray-200 rounded-xl"
        >
          {t("addTag")}
        </button>
      )}
    </div>
  );
}
