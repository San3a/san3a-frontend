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
            className="border border-gray-300 p-2 rounded-md flex-1"
          />

          <button
            type="button"
            onClick={() => remove(i)}
            className="bg-red-600 text-white
                        rounded-full w-8 h-8 flex items-center justify-center
                        text-md opacity-80 hover:opacity-100 transition cursor-pointer"
          >
            ×
          </button>
        </div>
      ))}

      {tags.length < 10 && (
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2 bg-gray-200 dark:bg-white/70 rounded-xl"
        >
          {t("addTag")}
        </button>
      )}
    </div>
  );
}
