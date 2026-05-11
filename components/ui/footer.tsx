import { FaInstagram, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-400">
      <div className="max-w-screen-2xl mx-auto h-19.5 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo/LogoPnbSmall.png"
            alt="Logo"
            width={48}
            height={48}
            className="object-contain"
          />

          <div className="leading-tight">
            <h1 className="font-bold text-sm text-black">
              Politeknik Negeri Bali
            </h1>

            <p className="text-[10px] text-gray-700 mt-1">
              Kampus Bukit, Jimbaran, South Kuta,
              <br />
              Badung Regency, Bali 80364
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-black">
          <FaInstagram className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
          <FaFacebookF className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
          <FaPhoneAlt className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
        </div>
      </div>
    </footer>
  );
}
