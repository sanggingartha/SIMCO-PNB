import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-8">
      <Image
        src="/assets/image-pnb.png"
        alt="ImagePNB"
        width={1400}
        height={700}
        className="w-full h-62.5 md:h-150 object-cover rounded-[20px] shadow-lg"
        priority
      />
    </section>
  );
}
