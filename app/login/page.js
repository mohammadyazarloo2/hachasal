"use client";

import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiPhone, HiMail, HiLockClosed } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useToast } from "../components/ui/toast";

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("email");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    code: ["", "", "", "", "", ""],
  });
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [timer, setTimer] = useState(120);
  const timerRef = useRef(null);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    if (status === "authenticated") {
      toast({
        title: "خوش آمدید",
        description: `${session.user.name || session.user.email} عزیز`,
      });
      router.push("/");
    }
  }, [status]);

  const startTimer = () => {
    setTimer(120);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format timer display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeTab,
          value: activeTab === "email" ? formData.email : formData.phone,
        }),
      });

      if (response.ok) {
        setStep(2);
        setCanResend(false);
        startTimer();
        toast({
          title: "کد تایید ارسال شد",
        });
      }
    } catch (error) {
      toast({
        title: "خطا در ارسال کد",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (code) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        code: code,
        callbackUrl: "/",
      });

      if (!result?.error) {
        toast({
          title: "ورود موفق",
          description: "خوش آمدید",
        });
        router.push("/");
      } else {
        setFormData((prev) => ({
          ...prev,
          code: ["", "", "", "", "", ""],
        }));
        inputRefs[0].current?.focus();
        toast({
          title: "خطا در تایید کد",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطا در ارسال درخواست",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index, value) => {
    if (!/^\d{0,1}$/.test(value)) return;

    const newCode = [...formData.code];
    newCode[index] = value;
    setFormData((prev) => ({ ...prev, code: newCode }));

    if (value !== "") {
      if (index < 5) {
        inputRefs[index + 1].current?.focus();
      } else {
        const completeCode = newCode.join("");
        if (completeCode.length === 6) {
          verifyCode(completeCode);
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!formData.code[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs[index - 1].current?.focus();
      } else {
        // Clear current input
        const newCode = [...formData.code];
        newCode[index] = "";
        setFormData((prev) => ({ ...prev, code: newCode }));
      }
    }
  };

  // Add resend functionality
  const resendCode = async () => {
    if (!canResend) return;

    try {
      const response = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        startTimer();
        setCanResend(false);
        toast({
          title: "کد جدید ارسال شد",
          description: "لطفا ایمیل خود را بررسی کنید",
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "خطا در ارسال کد جدید",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-400 to-amber-500 p-8 lg:p-12 text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white/20 backdrop-blur-sm rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center"
              >
                {step === 1 ? (
                  activeTab === "email" ? (
                    <HiMail className="text-5xl" />
                  ) : (
                    <HiPhone className="text-5xl" />
                  )
                ) : (
                  <HiLockClosed className="text-5xl" />
                )}
              </motion.div>
              <h2 className="text-2xl font-bold mb-6 text-center">
                {step === 1 ? "ورود به سایت" : "تایید کد ارسال شده"}
              </h2>
              <p className="text-white/90 leading-relaxed text-justify">
                {step === 1
                  ? `برای ورود به سایت ${
                      activeTab === "email" ? "ایمیل" : "شماره موبایل"
                    } خود را وارد کنید.`
                  : `کد تایید به ${
                      activeTab === "email" ? formData.email : formData.phone
                    } ارسال شد.`}
              </p>
            </div>

            <div className="lg:col-span-7 p-8 lg:p-12">
              {step === 1 && (
                <div className="flex rounded-xl overflow-hidden border mb-6 max-w-md mx-auto">
                  <button
                    className={`flex-1 py-3 ${
                      activeTab === "email"
                        ? "bg-amber-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() => setActiveTab("email")}
                  >
                    ایمیل
                  </button>
                  <button
                    className={`flex-1 py-3 ${
                      activeTab === "phone"
                        ? "bg-amber-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() => setActiveTab("phone")}
                  >
                    موبایل
                  </button>
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.form
                    key="credentials"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-md mx-auto"
                    onSubmit={handleSendCode}
                  >
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2 font-medium">
                        {activeTab === "email" ? "ایمیل" : "شماره موبایل"}
                      </label>
                      <div className="relative">
                        <input
                          type={activeTab === "email" ? "email" : "tel"}
                          dir="ltr"
                          className="w-full px-4 py-3 text-gray-700 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all text-center text-lg"
                          placeholder={
                            activeTab === "email"
                              ? "example@email.com"
                              : "09xxxxxxxxx"
                          }
                          value={
                            activeTab === "email"
                              ? formData.email
                              : formData.phone
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [activeTab]:
                                activeTab === "phone"
                                  ? e.target.value.replace(/\D/g, "")
                                  : e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300"
                      disabled={
                        loading ||
                        (activeTab === "phone"
                          ? !(
                              formData.phone.length === 11 &&
                              formData.phone.startsWith("09")
                            )
                          : !formData.email.includes("@"))
                      }
                    >
                      {loading ? "در حال ارسال..." : "دریافت کد تایید"}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="verification"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-md mx-auto"
                  >
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2 font-medium">
                        کد تایید را وارد کنید
                      </label>
                      <div className="flex gap-2 justify-center mb-4">
                        {[...Array(6)]
                          .map((_, index) => (
                            <input
                              key={index}
                              ref={inputRefs[index]}
                              type="text"
                              maxLength={1}
                              className="w-12 h-12 text-center text-gray-700 text-xl font-bold rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all"
                              value={formData.code[index]}
                              onChange={(e) =>
                                handleCodeChange(index, e.target.value)
                              }
                              onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                          ))
                          .reverse()}
                      </div>
                      <div className="text-center text-sm mb-4">
                        {!canResend ? (
                          <span className="text-gray-500">
                            ارسال مجدد کد تا {formatTime(timer)} دیگر
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={resendCode}
                            className="text-green-500 hover:text-green-600"
                          >
                            ارسال مجدد کد
                          </button>
                        )}
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-amber-500 hover:text-amber-600 text-sm"
                        >
                          ویرایش{" "}
                          {activeTab === "email" ? "ایمیل" : "شماره موبایل"}
                        </button>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300"
                      disabled={
                        loading || formData.code.some((digit) => digit === "")
                      }
                    >
                      {loading ? "در حال بررسی..." : "ورود به سایت"}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
