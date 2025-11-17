import { useTranslation } from "react-i18next";

export default function ImageUploader({
  existingImages,
  setExistingImages,
  newImages,
  setNewImages,
}) {
  const { t } = useTranslation();

  const handleNewFiles = (e) => {
    const files = Array.from(e.target.files);
    const valid = files.filter((f) => f.name.match(/\.(jpg|jpeg|png|gif)$/i));

    const mapped = valid.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages([...newImages, ...mapped]);
  };

  const removeExisting = (idx) => {
    setExistingImages(existingImages.filter((_, i) => i !== idx));
  };

  const removeNew = (idx) => {
    setNewImages(newImages.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor="image-upload"
        className="flex items-center justify-center gap-3 bg-blue-600 text-white font-medium cursor-pointer rounded-xl py-3 px-5"
      >
        {t("uploadImages")}
      </label>

      <input
        id="image-upload"
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.gif"
        onChange={handleNewFiles}
        className="hidden"
      />

      {existingImages.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">{t("existingImages")}</h4>
          <div className="grid grid-cols-3 gap-3">
            {existingImages.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img.url}
                  className="h-24 w-full object-contain rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => removeExisting(i)}
                  className="
                        absolute top-1 right-1 bg-red-600 text-white
                        rounded-full w-6 h-6 flex items-center justify-center
                        text-sm opacity-80 hover:opacity-100 transition
                      "
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {newImages.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">{t("newImages")}</h4>
          <div className="grid grid-cols-3 gap-3">
            {newImages.map((imgObj, i) => (
              <div key={i} className="relative">
                <img
                  src={imgObj.preview}
                  className="h-24 w-full object-contain rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => removeNew(i)}
                  className="
                        absolute top-1 right-1 bg-red-600 text-white
                        rounded-full w-6 h-6 flex items-center justify-center
                        text-sm opacity-80 hover:opacity-100 transition
                      "
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
