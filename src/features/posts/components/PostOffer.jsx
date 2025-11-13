import { useTranslation } from "react-i18next";

function PostOffer() {
  const { t } = useTranslation();

  return (
    <div className="mt-5">
      <div className="flex">
        <img
          className="h-8 w-8 bg-black rounded-full shrink-0"
          src="https://plus.unsplash.com/premium_photo-1755882951408-b6d668ccca21?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="w-full   bg-black/10 rounded-lg px-3 py-1 ms-2">
          <span className="font-semibold text-[16px]">Ahmed Mohamed</span>
          <span className="font-bold text-gray-700 text-[14px]">.50EGP</span>

          <p className="font-normal text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nisi
            eius excepturi nulla mollitia quasi vitae harum nostrum repellendus
            odit perferendis amet fugiat illum dolore reiciendis rerum.
            Possimus, laborum accusamus!
          </p>
        </div>
      </div>

      <button className="text-blue-600 ms-10 font-bold hover:scale-102 transition-transform mt-2 cursor-pointer">
        {t("startChat")}
      </button>
    </div>
  );
}

export default PostOffer;
