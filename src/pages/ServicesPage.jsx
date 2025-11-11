import { motion } from 'framer-motion';
import Services from '../components/Services';
import BookingForm from '../components/BookingForm';
import ChatWidget from '../components/ChatWidget';

function ServicesPage() {
  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#7ED957] to-[#2E8B3A] text-white py-16"
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-2xl">
            Comprehensive dental care tailored to your needs, delivered with expertise and compassion.
          </p>
        </div>
      </motion.div>
      <Services detailed={true} />
      <BookingForm />
      <ChatWidget/>
    </div>
  );
}

export default ServicesPage;
