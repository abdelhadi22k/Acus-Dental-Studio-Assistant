import { motion } from 'framer-motion';
import About from '../components/About';
import Team from '../components/Team';
import ChatWidget from '../components/ChatWidget';

function AboutPage() {
  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#7ED957] to-[#2E8B3A] text-white py-16"
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-2xl">
            Your trusted partner in dental health, committed to creating beautiful smiles and lasting relationships.
          </p>
        </div>
      </motion.div>
      <About detailed={true} />
      <Team />
      <div className="py-16 bg-[#EAF9EA]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#222222] mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#222222]">Excellence</h3>
                <p className="text-[#6B6B6B]">
                  We maintain the highest standards in dental care and continuously invest in advanced technologies.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">♥</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#222222]">Compassion</h3>
                <p className="text-[#6B6B6B]">
                  Every patient receives personalized care in a comfortable, anxiety-free environment.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">★</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#222222]">Trust</h3>
                <p className="text-[#6B6B6B]">
                  We build lasting relationships through honest communication and transparent treatment plans.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <ChatWidget/>
    </div>
  );
}

export default AboutPage;
