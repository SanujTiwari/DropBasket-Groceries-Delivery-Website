import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* Background Banner */}
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center px-6 md:pr-24">
        
        {/* Heading */}
        <h1 className="text-2xl md:text-4xl font-bold text-primary mb-10">
          Why We are the Best?
        </h1>

        {/* Features List */}
        <div className="flex flex-col gap-6 w-full max-w-md">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4"
            >
              {/* Icon */}
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-10 h-10 md:w-12 md:h-12"
              />

              {/* Text Content */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
