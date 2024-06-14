import Image from "next/image";

export default function FooterContent() {
  return (
    <div className="max-w-5xl xl:max-w-6xl mx-auto py-8 px-12 h-full flex flex-col sm:flex-row items-center justify-between">
      <div>
        <Image src="/gut1.png" alt="logo" width={250} height={250} />
      </div>
      <h3 className="text-2xl md:text-3xl italic font-[200] text-center">
        &bdquo;Find Home, Live Better&rdquo;
      </h3>
    </div>
  );
}
