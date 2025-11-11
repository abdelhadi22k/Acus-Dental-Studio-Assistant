import { motion } from 'framer-motion';
import { Award, Users, Clock, Shield } from 'lucide-react';

function About({ detailed = false }) {
  const stats = [
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Users, value: '5000+', label: 'Happy Patients' },
    { icon: Clock, value: '24/7', label: 'Emergency Care' },
    { icon: Shield, value: '100%', label: 'Safe & Sterile' },
  ];

  return (
    <section className="py-20 bg-[#EAF9EA]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3845630/pexels-photo-3845630.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Dental team at work"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-6">
              About ACOS Dental Studio
            </h2>
            <p className="text-lg text-[#6B6B6B] mb-6 leading-relaxed">
              At ACOS Dental Studio, we believe that exceptional dental care goes beyond treating teeth. We're committed to creating a welcoming environment where you feel comfortable, informed, and confident in your treatment decisions.
            </p>
            <p className="text-lg text-[#6B6B6B] mb-8 leading-relaxed">
              Our state-of-the-art facility combines advanced technology with a gentle, personalized approach to dentistry. Every member of our team is dedicated to helping you achieve optimal oral health and a smile you'll love to share.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center bg-white p-6 rounded-2xl shadow-md"
                >
                  <stat.icon size={32} className="text-[#7ED957] mx-auto mb-3" />
                  <div className="text-3xl font-bold text-[#222222] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#6B6B6B]">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {detailed && (
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-[#222222] mb-4">Working Hours</h3>
                <div className="space-y-2 text-[#6B6B6B]">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">9:00 AM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">Emergency Only</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
