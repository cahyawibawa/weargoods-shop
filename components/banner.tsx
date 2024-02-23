"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function Banner() {
  const slides = [
    {
      url: "/images/banner-trend.jpg",
    },
    {
      url: "https://cld.accentuate.io/556988006531/1683877858325/NEW-BALANCE.-BANNER-DESKTOP.jpg?v=1683877858326&options=w_1944",
    },
    {
      url: "https://www.converse.id/media/weltpixel/owlcarouselslider/images/d/e/dekstop_lifestyle_1.jpg",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div className="group relative m-auto h-[780px] w-full py-8">
      <div
        style={{
          backgroundImage: `url(${slides[currentSlide].url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="h-full w-full rounded-md bg-no-repeat bg-center bg-cover duration-500"
      />
      {/* Left Arrow */}
      <div className="absolute left-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
        <ChevronLeftIcon onClick={prevSlide} className="h-6 w-6" />
      </div>
      {/* Right Arrow */}
      <div className="absolute right-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
        <ChevronRightIcon onClick={nextSlide} className="h-6  w-6" />
      </div>
    </div>
  );
}
