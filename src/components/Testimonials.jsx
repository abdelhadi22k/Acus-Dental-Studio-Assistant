import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Jennifer Martinez',
      role: 'Marketing Executive',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      text: 'ACOS Dental Studio transformed my smile! The team is professional, caring, and the results exceeded my expectations. I finally have the confidence to smile without hesitation.',
      rating: 5,
    },
    {
      name: 'Robert Thompson',
      role: 'Business Owner',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
      text: 'After years of dental anxiety, I found a home at ACOS. Dr. Johnson and her team made me feel comfortable and explained every step. Best dental experience ever!',
      rating: 5,
    },
    {
      name: 'Lisa Wang',
      role: 'Teacher',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
      text: 'The cosmetic dentistry work I received was absolutely outstanding. My veneers look completely natural, and the entire process was smooth and pain-free.',
      rating: 5,
    },
    {
      name: 'David Brown',
      role: 'Software Engineer',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      text: 'From my first consultation to follow-up care, everything was exceptional. The technology they use is cutting-edge, and the staff is incredibly friendly and professional.',
      rating: 5,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-[#7ED957] to-[#2E8B3A] text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Patients Say
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Real stories from real patients who trust us with their smiles
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white text-[#222222] rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <div className="flex mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={24} className="fill-[#7ED957] text-[#7ED957]" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-[#6B6B6B] mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-[#6B6B6B]">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
