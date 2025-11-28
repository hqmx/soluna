import About from '@/components/About';
import PhotoCards from '@/components/PhotoCards';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import GoogleMap from '@/components/GoogleMap';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <PhotoCards />
      <Contact />
      <GoogleMap />
      <Footer />
    </main>
  );
}
