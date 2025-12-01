"use client";

import React, { JSX } from "react";
import Image from "next/image";

const Carousel = (): JSX.Element => {
  

  // -------------------------------
  // UPDATED: Every card now uses <Image />
  // -------------------------------
  const cardData = [
    {
      top: "top-[114px]",
      left: "left-[719px]",
      imgSrc: "/carousel/i13.jpeg",
      rotate: "",
      opacity: "opacity-100",
      saturation: "saturate-100",
    },

    {
      top: "top-[65px]",
      left: "left-[895px]",
      imgSrc: "/carousel/i2.jpeg",
      rotate: "",
      opacity: "opacity-95",
      saturation: "saturate-[95%]",
    },

    {
      top: "top-[65px]",
      left: "left-[540px]",
      imgSrc: "/carousel/i3.jpeg",
      rotate: "",
      opacity: "opacity-95",
      saturation: "saturate-[95%]",
    },

    {
      top: "top-[117px]",
      left: "left-[360px]",
      imgSrc: "/carousel/i4.jpeg",
      rotate: "",
      opacity: "opacity-85",
      saturation: "saturate-[85%]",
    },

    {
      top: "top-[117px]",
      left: "left-[1079px]",
      imgSrc: "/carousel/i5.jpeg",
      rotate: "",
      opacity: "opacity-85",
      saturation: "saturate-[85%]",
    },

    {
      top: "top-[117px]",
      left: "left-0",
      imgSrc: "/carousel/i6.jpeg",
      rotate: "",
      opacity: "opacity-50",
      saturation: "saturate-[50%]",
    },

    {
      top: "top-[117px]",
      left: "left-[1439px]",
      imgSrc: "/carousel/i7.jpeg",
      rotate: "",
      opacity: "opacity-50",
      saturation: "saturate-[50%]",
    },

    {
      top: "top-[65px]",
      left: "left-[183px]",
      imgSrc: "/carousel/i8.jpeg",
      rotate: "",
      opacity: "opacity-75",
      saturation: "saturate-[75%]",
    },

    {
      top: "top-[65px]",
      left: "left-[1256px]",
      imgSrc: "/carousel/i9.jpeg",
      rotate: "",
      opacity: "opacity-75",
      saturation: "saturate-[75%]",
    },

    {
      top: "top-[362px]",
      left: "left-0",
      imgSrc: "/carousel/i10.jpeg",
      rotate: "",
      opacity: "opacity-50",
      saturation: "saturate-[50%]",
    },

    {
      top: "top-[362px]",
      left: "left-[1439px]",
      imgSrc: "/carousel/i11.jpeg",
      rotate: "",
      opacity: "opacity-50",
      saturation: "saturate-[50%]",
    },

    {
      top: "top-[310px]",
      left: "left-[183px]",
      imgSrc: "/carousel/i12.jpeg",
      rotate: "",
      opacity: "opacity-75",
      saturation: "saturate-[75%]",
    },

    {
      top: "top-[310px]",
      left: "left-[1256px]",
      imgSrc: "/carousel/i1.jpeg",
      rotate: "",
      opacity: "opacity-75",
      saturation: "saturate-[75%]",
    },
  ];

  // -------------------------------
  const overlayData = [
    { top: "top-[-30px]", left: "left-0" },
    { top: "top-[-80px]", left: "left-[179px]" },
    { top: "top-[-30px]", left: "left-[358px]" },
    { top: "top-[-80px]", left: "left-[537px]" },
    { top: "top-[-30px]", left: "left-[716px]" },
    { top: "top-[-80px]", left: "left-[895px]" },
    { top: "top-[-30px]", left: "left-[1074px]" },
    { top: "top-[-80px]", left: "left-[1253px]" },
    { top: "top-[-30px]", left: "left-[1432px]" },
  ];

  const dottedLineData = [
    { top: "top-[calc((637-100)*1px)]", left: "left-[257px]" },
    { top: "top-[calc((691-100)*1px)]", left: "left-20" },
    { top: "top-[calc((441-100)*1px)]", left: "left-[438px]" },
    { top: "top-[calc((392-100)*1px)]", left: "left-[616px]" },
    { top: "top-[calc((441-100)*1px)]", left: "left-[797px]" },
    { top: "top-[calc((392-100)*1px)]", left: "left-[975px]" },
    { top: "top-[calc((441-100)*1px)]", left: "left-[1157px]" },
    { top: "top-[calc((637-100)*1px)]", left: "left-[1337px]" },
    { top: "top-[calc((685-100)*1px)]", left: "left-[1516px]" },
  ];

  const dots = Array(14).fill(null);
return (
  <>
    {/* ⭐ DESKTOP / LARGE SCREENS */}
    <div className="hidden lg:block overflow-x-hidden min-w-[1596px] min-h-[923px] relative mx-auto px-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`absolute ${card.top} ${card.left} w-40 h-[227px] rounded-2xl overflow-hidden`}
        >
          <Image
            src={card.imgSrc}
            alt="card"
            width={160}
            height={227}
            className={`
              w-40 h-full object-cover rounded-2xl
              ${card.rotate}
              ${card.opacity} ${card.saturation}
              transition-all ease-in-out duration-500
              hover:opacity-100 hover:saturate-100
            `}
          />
        </div>
      ))}

      {overlayData.map((ov, i) => (
        <div
          key={i}
          className={`
            absolute ${ov.top} ${ov.left}
            w-40 h-[127px] rounded-[25px]
            bg-[linear-gradient(180deg,rgba(217,217,217,0)_0%,rgba(169,169,169,0.13)_47%,rgba(140,140,140,0.26)_76%,rgba(115,115,115,0.42)_100%)]
            opacity-70
          `}
        />
      ))}

      {dottedLineData.map((line, index) => (
        <div
          key={index}
          className={`${line.top} ${line.left} flex flex-col w-0.5 items-center justify-center gap-2 absolute`}
        >
          {dots.map((_, i) => (
            <div
              key={i}
              className="relative self-stretch w-full bg-[#a9a8a8] rounded-[1px] aspect-[1]"
            />
          ))}
        </div>
      ))}
    </div>

    {/* ⭐ TABLET + MOBILE → MARQUEE */}
   <div className="block lg:hidden w-full overflow-hidden py-26 relative">
  {/* ⭐ Left Fade Overlay */}
  <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none bg-linear-to-r from-background to-transparent" />
  
  {/* ⭐ Right Fade Overlay */}
  <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none bg-linear-to-l from-background to-transparent" />

  <div className="flex gap-4 animate-marquee whitespace-nowrap">
    {cardData.map((card, index) => (
      <div key={index} className="w-40 aspect-2/3 rounded-xl overflow-hidden shrink-0">
        <Image
          src={card.imgSrc}
          alt="img"
          width={128}
          height={176}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    ))}

    {/* Duplicate for infinite loop */}
    {cardData.map((card, index) => (
      <div key={`dup-${index}`} className="w-32 h-44 rounded-xl overflow-hidden shrink-0">
        <Image
          src={card.imgSrc}
          alt="img"
          width={128}
          height={176}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    ))}
  </div>
</div>

  </>
);

};

export default Carousel;
