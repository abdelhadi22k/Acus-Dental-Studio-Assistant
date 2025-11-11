import { motion } from 'framer-motion';
import { Calendar, Phone } from 'lucide-react';

function Hero() {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#EAF9EA] to-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7ED957] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2E8B3A] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#222222] mb-6 leading-tight">
              ACOS <span className="text-[#7ED957]">Dental Studio</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#6B6B6B] mb-8 leading-relaxed">
              Creating confident smiles with care
            </p>
            <p className="text-lg text-[#6B6B6B] mb-10 leading-relaxed">
              Experience exceptional dental care in a comfortable, modern environment. Our expert team is dedicated to your oral health and beautiful smile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToBooking}
                className="flex items-center justify-center space-x-2 bg-[#7ED957] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#2E8B3A] transition-all transform hover:scale-105 shadow-lg"
              >
                <Calendar size={24} />
                <span>Book Appointment</span>
              </button>
              <a
                href="tel:+1234567890"
                className="flex items-center justify-center space-x-2 border-2 border-[#7ED957] text-[#7ED957] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#7ED957] hover:text-white transition-all transform hover:scale-105"
              >
                <Phone size={24} />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern dental clinic interior"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7ED957]/20 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">15+</span>
                </div>
                <div>
                  <p className="text-sm text-[#6B6B6B]">Years of</p>
                  <p className="text-lg font-bold text-[#222222]">Excellence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
