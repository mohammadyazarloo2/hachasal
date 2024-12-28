"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiShieldCheck,
  HiLightningBolt,
  HiCube,
  HiUserGroup,
  HiGlobe,
  HiTruck,
  HiChartBar,
  HiHeart,
  HiSparkles,
  HiLocationMarker,
  HiPhotograph,
} from "react-icons/hi";
import Image from "next/image";

export default function About() {
  const [activeTab, setActiveTab] = useState("history");

  // اضافه کردن بخش گالری تصاویر
  const galleryImages = [
    "/honey1.jpg",
    "/honey2.jpg",
    "/honey3.jpg",
    // تصاویر بیشتر
  ];

  // اضافه کردن بخش نقشه مناطق تولید
  const productionAreas = [
    { name: "دماوند", products: ["عسل گون", "عسل آویشن"] },
    { name: "سبلان", products: ["عسل چهل گیاه", "عسل گشنیز"] },
    // مناطق بیشتر
  ];

  // اضافه کردن بخش جدید برای نمایش فرآیند تولید
  const productionProcess = [
    {
      title: "انتخاب گل‌های مرغوب",
      desc: "انتخاب بهترین مناطق گل‌دار برای تولید عسل",
      icon: <HiSparkles className="text-3xl text-amber-500" />,
    },
    // مراحل بیشتر
  ];

  const features = [
    {
      icon: <HiShieldCheck className="text-3xl" />,
      title: "کیفیت تضمینی",
      desc: "عسل طبیعی و ارگانیک با بالاترین کیفیت و دارای مجوزهای بهداشتی",
      color: "amber",
    },
    {
      icon: <HiLightningBolt className="text-3xl" />,
      title: "ارسال سریع",
      desc: "ارسال سریع و مطمئن به سراسر کشور با بهترین بسته‌بندی",
      color: "green",
    },
    {
      icon: <HiCube className="text-3xl" />,
      title: "بسته‌بندی ایمن",
      desc: "بسته‌بندی استاندارد و ضد ضربه با حفظ کیفیت محصول",
      color: "blue",
    },
    {
      icon: <HiUserGroup className="text-3xl" />,
      title: "رضایت مشتری",
      desc: "بیش از 90% رضایت مشتری در خرید محصولات",
      color: "purple",
    },
    {
      icon: <HiGlobe className="text-3xl" />,
      title: "پوشش سراسری",
      desc: "ارسال به تمام نقاط کشور با بهترین کیفیت",
      color: "indigo",
    },
    {
      icon: <HiHeart className="text-3xl" />,
      title: "تضمین اصالت",
      desc: "تضمین اصالت و طبیعی بودن تمامی محصولات",
      color: "red",
    },
  ];

  const stats = [
    { number: "1400", label: "سال تاسیس" },
    { number: "+5000", label: "مشتری راضی" },
    { number: "+20", label: "نوع محصول" },
    { number: "+100", label: "زنبوردار همکار" },
  ];

  const tabContent = {
    history: {
      title: "تاریخچه هاچ عسل",
      content: `هاچ عسل در سال 1400 با هدف ارائه عسل طبیعی و ناب به هموطنان عزیز تاسیس شد. از همان ابتدا، تمرکز ما بر کیفیت و اصالت محصولات بوده است. ما با همکاری بهترین زنبورداران کشور و با استفاده از روش‌های نوین زنبورداری، بهترین عسل‌های طبیعی را به دست مشتریان می‌رسانیم.`,
    },
    mission: {
      title: "ماموریت ما",
      content: `ماموریت ما ترویج فرهنگ مصرف عسل طبیعی و آموزش تشخیص عسل اصل از تقلبی است. ما معتقدیم هر ایرانی حق دارد از بهترین و طبیعی‌ترین عسل استفاده کند.`,
    },
    values: {
      title: "ارزش‌های ما",
      content: `صداقت، شفافیت و کیفیت سه اصل اساسی ما در هاچ عسل هستند. ما به مشتریانمان احترام می‌گذاریم و همواره در تلاشیم تا بهترین خدمات را ارائه دهیم.`,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Hero Section */}
            <div className="relative h-64 bg-gradient-to-r from-amber-400 to-amber-500">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">درباره هاچ عسل</h1>
                  <p className="max-w-2xl mx-auto">
                    ارائه دهنده برترین و طبیعی‌ترین عسل‌های ایران
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-amber-500 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-${feature.color}-50 rounded-xl p-6 transition-all duration-300`}
                  >
                    <div
                      className={`w-14 h-14 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-4`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Tabs Section */}
              <div className="max-w-4xl mx-auto">
                <div className="flex space-x-4 mb-8 border-b">
                  {Object.keys(tabContent).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === tab
                          ? "text-amber-500 border-b-2 border-amber-500"
                          : "text-gray-500 hover:text-amber-500"
                      }`}
                    >
                      {tabContent[tab].title}
                    </button>
                  ))}
                </div>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-lg max-w-none"
                >
                  <h2 className="text-2xl font-bold mb-4">
                    {tabContent[activeTab].title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {tabContent[activeTab].content}
                  </p>
                </motion.div>
              </div>

              {/* Timeline Section */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8 text-center">
                  مسیر پیشرفت ما
                </h2>
                <div className="relative">
                  {/* Add timeline content here */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{
          backgroundImage: "url('/honey-bg.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
        className="h-96 relative my-16"
      >
        <div className="absolute inset-0 bg-amber-500/60 backdrop-blur-sm">
          <div className="flex items-center justify-center h-full text-white">
            <h2 className="text-4xl font-bold text-center">
              کیفیت در هر قطره عسل
            </h2>
          </div>
        </div>
      </motion.div>

      {/* اضافه کردن بخش گالری */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-16">
        {galleryImages.map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative h-64 rounded-xl overflow-hidden group"
          >
            <Image
              src={img}
              layout="fill"
              objectFit="cover"
              alt="تصاویر محصولات"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <HiPhotograph className="text-4xl text-white" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* اضافه کردن بخش مناطق تولید */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 my-16">
        <h2 className="text-2xl font-bold mb-8 text-center">مناطق تولید عسل</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {productionAreas.map((area, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-4 rounded-xl shadow-lg"
            >
              <HiLocationMarker className="text-2xl text-amber-500 mb-2" />
              <h3 className="font-bold mb-2">{area.name}</h3>
              <ul className="text-sm text-gray-600">
                {area.products.map((product, idx) => (
                  <li key={idx}>{product}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* اضافه کردن بخش اینفوگرافیک فرآیند تولید */}
      <div className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-500/20 -skew-y-6 z-0" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-12 text-center">
            فرآیند تولید عسل طبیعی
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {productionProcess.map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-50 rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* اضافه کردن بخش نظرات مشتریان */}
      <div className="my-16">
        <h2 className="text-2xl font-bold mb-8 text-center">نظرات مشتریان</h2>
        <div className="grid md:grid-cols-3 gap-6">{/* کامپوننت نظرات */}</div>
      </div>
    </div>
  );
}
