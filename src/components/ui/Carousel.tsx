import React, { useState } from 'react';

interface CarouselSlide {
  title: string;
  description: string;
  image: string;
}
interface CarouselProps {
  slides: CarouselSlide[];
}

const Carousel = ({ slides }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="w-1/2 bg-secondary p-12 flex flex-col justify-between text-white relative overflow-hidden">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-lg transition-all duration-500 transform">
          <img
            src={slides[currentSlide].image}
            alt="Forgot Password"
            className="max-w-md mx-auto mb-8"
            style={{ maxWidth: '448px', maxHeight: '448px' }}
          />
          <h2 className="text-xl font-bold mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-xs text-white/80">
            {slides[currentSlide].description}
          </p>
        </div>
      </div>

      {/* Carousel Indicators */}
      {slides.length > 1 && (
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
