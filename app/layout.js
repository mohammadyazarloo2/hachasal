import { Geist } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ToastProvider } from "./components/ui/toast";
import { SessionProvider } from "next-auth/react";
import Providers from "./components/Providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata = {
  title: "هاچ عسل | فروشگاه آنلاین عسل طبیعی",
  description: "خرید انواع عسل طبیعی و ارگانیک",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={geist.variable}>
      <body className="min-h-screen bg-white">
        <Providers>
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="bg-yellow-400 mt-auto py-8">
            <div className="max-w-7xl mx-auto px-4">
              <p className="text-center text-black">
                تمامی حقوق برای هاچ عسل محفوظ است © {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}