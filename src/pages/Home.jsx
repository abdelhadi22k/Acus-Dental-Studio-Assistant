import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import BookingForm from '../components/BookingForm';
import ChatWidget from '../components/ChatWidget';

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Team />
      <Testimonials />
      <BookingForm />
      <ChatWidget/>
      <FAQ />
    </>
  );
}

export default Home;
