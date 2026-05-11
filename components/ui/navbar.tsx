"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Monitoring", href: "/monitoring" },
  { name: "Daily Data", href: "/daily-data" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="w-full h-16 bg-white border-b border-black/10 px-4 md:px-6 lg:px-10 flex items-center justify-between">
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
          {navItems.map((item) => {
            const isActive = mounted && pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-1 text-sm font-semibold rounded-full border transition-all duration-300
                  ${
                    isActive
                      ? "border-[#243B6B] bg-[#243B6B] text-white"
                      : "border-[#8D8A7D] text-[#3D3D3D] hover:bg-[#243B6B] hover:text-white"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
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
              className="bg-white rounded-[30px] shadow-2xl p-6"
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

              {/* Mobile Menu */}
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = mounted && pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block w-full px-4 py-3 rounded-xl text-md font-semibold transition-all duration-300
                       ${
                         isActive
                           ? "bg-[#243B6B] text-white"
                           : "text-[#1D2433] hover:bg-black/5 active:scale-[0.98]"
                       }
                      `}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <div className="border-b border-black/10"></div>

                <Button className="mt-3 h-12 w-full rounded-xl bg-[#2F5D50] text-white font-semibold tracking-wide shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#274b40] active:scale-[0.98]">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Ask AI
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
