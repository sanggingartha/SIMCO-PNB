"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Monitoring", href: "/monitoring" },
  { name: "Daily Data", href: "/daily-data" },
  // { name: "C.A.I", href: "/cai" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="w-full h-16 bg-[#ECE9D8] border-b border-black/10 px-4 md:px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo/LogoPnbSmall.png"
            alt="PNB Logo"
            width={40}
            height={40}
            priority
            className="object-contain w-8 h-8 md:w-10 md:h-10"
          />

          <div className="leading-none text-[#2F2F2F] ml-2 hidden md:block">
            <p className="text-xs md:text-sm font-semibold">Politeknik</p>
            <p className="text-xs md:text-sm font-semibold">Negeri Bali</p>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
            <p className="text-sm font-semibold text-[#2F2F2F] tracking-widest">
              SIMCO PNB
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-1 text-sm font-semibold rounded-full border border-[#8D8A7D] text-[#3D3D3D] hover:bg-[#243B6B] hover:text-white transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-2xl text-black"
        >
          ☰
        </button>

        <div className="hidden md:block w-8" />
      </nav>
      <AnimatePresence>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ y: -40, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -40, opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                }}
                className="bg-[#ECE9D8] rounded-[30px] shadow-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/logo/LogoPnbSmall.png"
                      alt="logo"
                      width={45}
                      height={45}
                      className="rounded-full"
                    />
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-2xl text-black"
                  >
                    ✕
                  </button>
                </div>

                {/* Menu */}
                <div className="space-y-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-md font-semibold text-[#1D2433]"
                    >
                      {item.name}
                    </Link>
                  ))}

                  <div className="border-b border-black/10"></div>

                  <Button className="w-full p-4 text-white tracking-widest">
                    Ask AI
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </>
  );
}
