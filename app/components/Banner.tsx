"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
export default function Banner() {
	const slides = [
		{
			url: "https://github.com/cahyawibawa/cahyawibawa/assets/62229971/4f8c5377-864d-4150-98f7-9e10745ae7f3",
		},
		// {
		//   url: 'https://www.converse.id/media/wysiwyg/Skate_-_Premium_Canvas_IND.jpg',
		// },
		// {
		//   url: 'https://www.converse.id/media/weltpixel/owlcarouselslider/images/d/i/digital_exclusive_embroidery_ind_main.jpg',
		// },
		{
			url: "https://www.converse.id/media/weltpixel/owlcarouselslider/images/r/e/retro_sport_block_ind_main.jpg",
		},
		// {
		//   url: 'https://plus.unsplash.com/premium_photo-1664362415244-aa746a5b6f4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YXBwYXJlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
		// },
		// {
		//   url: 'https://images.unsplash.com/photo-1602810319428-019690571b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFwcGFyZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60',
		// },
		// {
		//   url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFwcGFyZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60',
		// },
	];
	const [currentSlide, setCurrentSlide] = useState(0);
	const prevSlide = () => {
		if (currentSlide === 0) {
			setCurrentSlide(slides.length - 1);
		} else {
			setCurrentSlide(currentSlide - 1);
		}
	};
	const nextSlide = () => {
		if (currentSlide === slides.length - 1) {
			setCurrentSlide(0);
		} else {
			setCurrentSlide(currentSlide + 1);
		}
	};

	return (
		<div className="group relative m-auto h-[780px] w-full max-w-[1400px] px-4 py-8">
			<div
				style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
				className="h-full w-full rounded-md bg-cover bg-center duration-500"
			/>
			{/* Left Arrow */}
			<div className="absolute left-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
				<ChevronLeftIcon onClick={prevSlide} className="h-6 w-6" />
			</div>
			{/* Right Arrow */}
			<div className="absolute right-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
				<ChevronRightIcon onClick={nextSlide} className="h-6  w-6" />
			</div>
			{/* <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled />
          </div>
        ))}
      </div> */}
		</div>
	);
}
