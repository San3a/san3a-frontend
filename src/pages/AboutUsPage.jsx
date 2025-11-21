/* eslint-disable */
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import airconds from "../assets/images/airconds.jpg";
import handshake from "../assets/images/handshake.jpeg";
import electricity from "../assets/images/electricity.webp";
import tech1 from "../assets/images/tech1.jpg";
import tech2 from "../assets/images/tech2.jpg";
import heater from "../assets/images/heater.jpg";
import osama from "../assets/images/osama.png";
import yousef from "../assets/images/yousef.png";
import alhassan from "../assets/images/alhassan.png";
import hossam from "../assets/images/hossam.png";
import khaleel from "../assets/images/khaleel.png";

export default function AboutUsPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const whyChooseUs = [
    {
      title: t("why.verified"),
      desc: t("why.verifiedDesc"),
      img: electricity,
    },
    {
      title: t("why.pricing"),
      desc: t("why.pricingDesc"),
      img: handshake,
    },
    {
      title: t("why.booking"),
      desc: t("why.bookingDesc"),
      img: airconds,
    },
    {
      title: t("why.ratings"),
      desc: t("why.ratingsDesc"),
      img: tech2,
    },
    {
      title: t("why.range"),
      desc: t("why.rangeDesc"),
      img: heater,
    },
    {
      title: t("why.support"),
      desc: t("why.supportDesc"),
      img: tech1,
    },
  ];

  const teamMembers = [
    { name: "Hossam Elfar", role: t("team.ceo"), img: hossam },
    { name: "Yousef Belal", role: t("team.design"), img: yousef },
    { name: "Alhassan Ali", role: t("team.engineer"), img: alhassan },
    { name: "Mahmoud Khaleel", role: t("team.experience"), img: khaleel },
    { name: "Osama Mohamed", role: t("team.experience"), img: osama },
  ];

  return (
    <div
      className={`min-h-screen py-24 px-6 sm:px-12 md:px-20 lg:px-32 bg-gray-50 dark:bg-gray-900 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative max-w-5xl mx-auto mb-32 flex flex-col lg:flex-row items-center gap-25"
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left w-200"
        >
          <h1 className="w-100 text-lg sm:text-5xl text-center font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-gray-700 text-center dark:text-gray-300 text-xl mb-8 max-w-3xl leading-relaxed">
            {t("hero.desc")}
          </p>
        </motion.div>

        <motion.img
          initial={{ x: 50, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          src={handshake}
          alt={t("hero.alt")}
          className="flex-1 rounded-3xl shadow-2xl object-cover w-full lg:w-180 hover:scale-105 transition-transform duration-500"
        />
      </motion.div>

      {/* Mission Section */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-36">
        <motion.img
          initial={{ opacity: 0, x: -120, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          src={airconds}
          alt={t("mission.alt")}
          className="rounded-3xl shadow-2xl w-full object-cover hover:scale-105 transition-transform duration-500"
        />

        <motion.div
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold dark:text-white text-gray-900">
            {t("mission.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {t("mission.desc")}
          </p>
        </motion.div>
      </div>

      {/* Vision Section */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-36">
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold dark:text-white text-gray-900">
            {t("vision.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {t("vision.desc")}
          </p>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 120, rotate: 2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          src={tech1}
          alt={t("vision.alt")}
          className="rounded-3xl shadow-2xl w-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-36">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center"
        >
          {t("why.title")}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              className="p-8 rounded-3xl border dark:border-white/10 border-gray-200 bg-white dark:bg-[#252728] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 rounded-2xl mb-4 object-cover"
              />
              <h3 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto mb-32"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {t("team.title")}
        </h2>

        <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed text-lg max-w-4xl mx-auto mb-12">
          {t("team.desc")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-9">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              className="flex flex-col items-center bg-white dark:bg-[#252728] rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 rounded-full mb-4 shadow-md object-cover"
              />
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="text-center text-gray-600 dark:text-gray-400 text-sm"
      >
        © {new Date().getFullYear()} San3a. {t("footer.rights")}
      </motion.div>
    </div>
  );
}
