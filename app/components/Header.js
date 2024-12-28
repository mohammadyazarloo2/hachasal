"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineShoppingBag, HiMenu, HiX,HiChevronDown,HiUser,HiCog,HiLogout } from "react-icons/hi";
import { useSession } from "next-auth/react";
import CartModal from "./CartModal";
import { useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-yellow-400">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="هاچ عسل"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse flex-1">
            <Link href="/" className="text-black hover:text-gray-800">
              صفحه اصلی
            </Link>
            <Link href="/about" className="text-black hover:text-gray-800">
              خدمات
            </Link>
            <Link href="/blog" className="text-black hover:text-gray-800">
              اخبار
            </Link>
            <Link href="/contact" className="text-black hover:text-gray-800">
              همکاری با ما
            </Link>
          </div>

          {/* Auth & Cart */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsCartOpen(true);
              }}
              className="bg-green-500 text-white p-2 rounded-md flex items-center"
            >
              <HiOutlineShoppingBag className="h-6 w-6" />
              <span className="ml-2">سبد خرید</span>
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                {cartItemsCount}
              </span>
            </Link>
            {session ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors">
                  <span className="text-black">{session.user.name}</span>
                  <HiChevronDown className="text-gray-500" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-2">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={`${
                              active ? "bg-amber-50" : ""
                            } flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700`}
                          >
                            <HiUser className="text-amber-500" />
                            پروفایل
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/settings"
                            className={`${
                              active ? "bg-amber-50" : ""
                            } flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700`}
                          >
                            <HiCog className="text-amber-500" />
                            تنظیمات
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={`${
                              active ? "bg-red-50" : ""
                            } flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 w-full`}
                          >
                            <HiLogout className="text-red-500" />
                            خروج
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link href="/login" className="text-black hover:text-gray-800">
                عضویت و ورود
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black">
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 text-black hover:bg-amber-600 rounded-md"
              >
                صفحه اصلی
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-black hover:bg-amber-600 rounded-md"
              >
                خدمات
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-black hover:bg-amber-600 rounded-md"
              >
                اخبار
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-black hover:bg-amber-600 rounded-md"
              >
                همکاری با ما
              </Link>
            </div>
          </div>
        )}
      </nav>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
