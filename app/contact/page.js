'use client'

import { useState } from 'react'
import { HiUser, HiMail, HiChatAlt2, HiArrowLeft, HiLightningBolt, HiShieldCheck, HiCube, HiPhone } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

export default function Contact() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    message: ''
  })
  const [hoveredFeature, setHoveredFeature] = useState(null)

  const features = [
    { 
      icon: <HiLightningBolt className="text-3xl" />, 
      title: "همکاری سریع", 
      desc: "شروع همکاری در کمترین زمان",
      color: "amber"
    },
    { 
      icon: <HiShieldCheck className="text-3xl" />, 
      title: "تضمین کیفیت", 
      desc: "ارائه محصولات با کیفیت عالی",
      color: "green"
    },
    { 
      icon: <HiCube className="text-3xl" />, 
      title: "ارسال به موقع", 
      desc: "تحویل سفارشات در اسرع وقت",
      color: "blue"
    }
  ]

  const formFields = [
    {
      name: 'username',
      label: 'نام و نام خانوادگی',
      type: 'text',
      icon: <HiUser className="text-xl" />,
      placeholder: 'نام خود را وارد کنید'
    },
    {
      name: 'email',
      label: 'پست الکترونیک',
      type: 'email',
      icon: <HiMail className="text-xl" />,
      placeholder: 'ایمیل خود را وارد کنید'
    },
    {
      name: 'phone',
      label: 'شماره تماس',
      type: 'tel',
      icon: <HiPhone className="text-xl" />,
      placeholder: 'شماره تماس خود را وارد کنید'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 py-12 px-4">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl mx-auto text-center mb-12"
              >
                <h1 className="text-3xl font-bold mb-6 text-gray-700">همکاری با هاچ عسل</h1>
                <p className="text-gray-600 leading-relaxed">
                  هاچ عسل با در نظر گرفتن نیاز های مردم به عسل طبیعی و نبود دانش کافی از انواع عسل و خواص آن سعی در ترویج فرهنگ عسل و شناخت عسل در سال 1400 شروع به فعالیت خود کرد
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.2 }}
                    onHoverStart={() => setHoveredFeature(index)}
                    onHoverEnd={() => setHoveredFeature(null)}
                    className="relative"
                  >
                    <motion.div
                      animate={{
                        scale: hoveredFeature === index ? 1.05 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <motion.div
                        animate={{ 
                          rotateY: hoveredFeature === index ? 360 : 0,
                          scale: hoveredFeature === index ? 1.2 : 1
                        }}
                        transition={{ duration: 0.6 }}
                        className={`w-14 h-14 bg-${feature.color}-300 rounded-full flex items-center justify-center mb-4`}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="font-bold text-lg mb-2 text-gray-700">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  className="group relative overflow-hidden bg-gradient-to-r from-amber-400 to-amber-500 text-white px-8 py-3 rounded-full font-medium"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    شروع همکاری با ما
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <HiArrowLeft />
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-12">
                <div className="lg:col-span-4 bg-gradient-to-br from-amber-400 to-amber-500 p-8 lg:p-12 text-white">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 mx-auto mb-8 flex items-center justify-center"
                  >
                    <HiUser className="text-4xl" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-center">فرم همکاری</h2>
                    <p className="text-white/90 leading-relaxed text-justify">
                      سایت هاچ عسل با در نظر گرفتن کیفیت مناسب و قیمت مناسب محصولات خود پیشرو در فروش عسل های طبیعی و کوهی بوده و از همکاران جدید استقبال می‌کند
                    </p>
                  </motion.div>
                </div>

                <div className="lg:col-span-8 p-8 lg:p-12">
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                    {formFields.map((field, index) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <label className="block text-gray-700 mb-2 font-medium">
                          {field.label}
                        </label>
                        <div className="relative">
                          <input
                            type={field.type}
                            className="w-full px-4 py-3 rounded-xl border text-gray-700 border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all"
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={(e) => setFormData({
                              ...formData,
                              [field.name]: e.target.value
                            })}
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {field.icon}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-gray-700 mb-2 font-medium">
                        توضیحات
                      </label>
                      <div className="relative">
                        <textarea
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl text-gray-700 border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all"
                          placeholder="پیام خود را وارد کنید"
                          value={formData.message}
                          onChange={(e) => setFormData({
                            ...formData,
                            message: e.target.value
                          })}
                        />
                        <span className="absolute left-3 top-4 text-gray-400">
                          <HiChatAlt2 className="text-xl" />
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300"
                      >
                        ارسال درخواست
                      </motion.button>

                      <button 
                        onClick={() => setShowForm(false)}
                        className="w-full text-amber-500 hover:text-amber-600 text-sm"
                      >
                        بازگشت به صفحه قبل
                      </button>
                    </motion.div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
