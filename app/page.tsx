import Hero from '@/components/Hero';
import About from '@/components/About';
import PhotoCards from '@/components/PhotoCards';
import Contact from '@/components/Contact';
import GoogleMap from '@/components/GoogleMap';
import Footer from '@/components/Footer';

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
