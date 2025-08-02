import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import JoinForm from '../components/JoinForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20"> {/* Push content below navbar */}
        <Hero />
        <About />
        <Features />
        <JoinForm />
      </main>
      <Footer />
    </>
  );
}
