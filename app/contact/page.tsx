"use client";

import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  User,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-6 mb-6">
          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-4xl py-2 md:text-5xl font-bold bg-linear-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent mb-4">
              Hubungi Kami
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Jika Anda memiliki pertanyaan, kritik, saran, atau membutuhkan
              bantuan terkait sistem monitoring lingkungan, silakan hubungi kami
              melalui formulir di bawah ini.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* MAP */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-linear-to-r from-emerald-500 to-emerald-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Lokasi Kami
                  </h2>
                </div>

                {/* MAP */}
                <div className="relative w-full h-80 bg-gray-200">
                  <iframe
                    src="https://www.google.com/maps?q=Politeknik+Negeri+Bali&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full"
                    title="Lokasi Politeknik Negeri Bali"
                  ></iframe>
                </div>

                <div className="p-6 bg-gray-50/50">
                  <p className="text-gray-700 flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />

                    <span>
                      Politeknik Negeri Bali, Bukit Jimbaran, Badung, Bali,
                      Indonesia
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-linear-to-r from-emerald-500 to-blue-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Kirim Pesan
                </h2>

                <p className="text-emerald-100 text-sm mt-1">
                  Kami akan membalas pesan Anda secepat mungkin
                </p>
              </div>

              <form onSubmit={handleSubmit} className="py-5 px-5 space-y-5">
                {/* NAMA */}
                <div>
                  <label className="flex text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                    <User className="h-4 w-4 text-emerald-600" />
                    Nama
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  />
                </div>

                {/* NOMOR HP */}
                <div>
                  <label className="flex text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    Nomor Telepon
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nomor telepon"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="flex text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-600" />
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  />
                </div>

                {/* PESAN */}
                <div>
                  <label className="flex text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-emerald-600" />
                    Pesan
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none transition-all duration-200"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Mengirim...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Berhasil Dikirim!
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Kirim Pesan
                    </>
                  )}
                </button>

                {/* FOOTER INFO */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4 text-emerald-600" />
                      <span>+62 812 3456 7890</span>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4 text-emerald-600" />
                      <span>simco@pnb.ac.id</span>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4 text-emerald-600" />
                      <span>Senin - Jumat : 08.00 - 17.00</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
