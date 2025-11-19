import { useTranslation } from "react-i18next";
import LoadingButton from "./LoadingButton";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  warningMessage,
  confirmButtonText,
  cancelButtonText,
}) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl transform transition-all animate-scaleIn mx-4">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {warningMessage && (
          <div className="p-6">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-800 dark:text-red-300 font-medium">
                {warningMessage}
              </p>
            </div>
          </div>
        )}

        <div className="p-6 border-t border-gray-200  dark:border-gray-700 flex gap-3 mx-auto">
          <button
            onClick={onClose}
            className="w-[50%] px-4 py-3 bg-gray-100 dark:bg-black  cursor-pointer rounded-md"
          >
            {cancelButtonText || t("cancel")}
          </button>
          <LoadingButton
            onClick={onConfirm}
            title={confirmButtonText || t("confirm")}
            color="red"
          />
        </div>
      </div>
    </div>
  );
}
