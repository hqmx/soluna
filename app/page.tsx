import About from '@/components/About';
import PhotoCards from '@/components/PhotoCards';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import DynamicHero from '@/components/DynamicHero';
import DynamicMap from '@/components/DynamicMap';

export default function Home() {
  return (
    <main className="min-h-screen">
      <DynamicHero />
      <About />
      <PhotoCards />
      <Contact />
      <DynamicMap />
      <Footer />
    </main>
  );
}
