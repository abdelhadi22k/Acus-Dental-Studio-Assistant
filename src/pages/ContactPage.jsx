import { motion } from 'framer-motion';
import Contact from '../components/Contact';
import BookingForm from '../components/BookingForm';
import ChatWidget from '../components/ChatWidget';

function ContactPage() {
  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#7ED957] to-[#2E8B3A] text-white py-16"
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl">
            We're here to answer your questions and schedule your appointment.
          </p>
        </div>
      </motion.div>
      <Contact />
      <BookingForm />
      <ChatWidget/>
    </div>
  );
}

export default ContactPage;
