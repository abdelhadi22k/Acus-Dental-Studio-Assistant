import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How often should I visit the dentist?',
      answer: 'We recommend visiting the dentist every 6 months for routine check-ups and cleanings. However, some patients may need more frequent visits depending on their oral health needs. Regular visits help prevent problems and catch any issues early.',
    },
    {
      question: 'Do you accept dental insurance?',
      answer: 'Yes, we accept most major dental insurance plans. Our team will work with your insurance provider to maximize your benefits. We also offer flexible payment plans for treatments not covered by insurance.',
    },
    {
      question: 'What should I do in a dental emergency?',
      answer: 'Call our office immediately at (123) 456-7890. We offer same-day emergency appointments and have a 24/7 support line. For severe trauma, visit the nearest emergency room and then contact us as soon as possible.',
    },
    {
      question: 'Are dental X-rays safe?',
      answer: 'Yes, dental X-rays are very safe. We use state-of-the-art digital X-ray technology that reduces radiation exposure by up to 90% compared to traditional film X-rays. The amount of radiation is minimal and well within safe limits.',
    },
    {
      question: 'How long does a dental implant procedure take?',
      answer: 'The entire implant process typically takes 3-6 months from start to finish. This includes the initial surgery, healing period, and placement of the final crown. The actual surgical procedure usually takes 1-2 hours per implant.',
    },
    {
      question: 'What are the payment options available?',
      answer: 'We accept cash, credit cards, debit cards, and offer flexible financing options through CareCredit. We also work with most insurance providers and can create customized payment plans to fit your budget.',
    },
    {
      question: 'Is teeth whitening safe for my enamel?',
      answer: 'Yes, professional teeth whitening is safe when performed under dental supervision. Our whitening treatments are designed to be gentle on your enamel while delivering effective results. We use proven methods that minimize sensitivity.',
    },
    {
      question: 'How can I prevent cavities?',
      answer: 'Prevent cavities by brushing twice daily with fluoride toothpaste, flossing daily, limiting sugary foods and drinks, and visiting your dentist regularly. Dental sealants and fluoride treatments can provide additional protection.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">
            Got questions? We've got answers
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-[#EAF9EA] transition-colors"
              >
                <span className="text-lg font-semibold text-[#222222] pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} className="text-[#7ED957] flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-[#6B6B6B] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
