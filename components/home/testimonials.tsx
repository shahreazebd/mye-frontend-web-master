"use client";

import { ArrowLeft } from "lucide-react";
import Slider from "react-slick";

import testimonialData from "@/lib/testimonial-data";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SingleTestimonial from "./single-testimonial";

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <ArrowLeft />,
    prevArrow: <ArrowLeft />,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1270,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className="container py-12 lg:py-20">
      <h3 className="mb-4 text-center font-bold text-[#505D68]">
        “It&apos;s easy, it&apos;s fun, and it&apos;s got charm to burn.”
      </h3>
      <div className="mb-12 text-center">
        <h4 className="mb-1 text-[27.89px] font-bold text-[#505D68] dark:text-white">
          MYE
        </h4>
        <p className="text-[#505D68] dark:text-white">App Store review</p>
      </div>
      <Slider {...settings}>
        {testimonialData.map((e) => (
          <div key={e.id} className="mt-8">
            <SingleTestimonial
              name={e.name}
              brand={e.brand}
              description={e.description}
              image={e.image}
              rating={e.rating}
              designation={e.designation}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
