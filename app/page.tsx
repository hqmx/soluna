'use client';

import dynamic from 'next/dynamic';
import About from '@/components/About';
import PhotoCards from '@/components/PhotoCards';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const GoogleMap = dynamic(() => import('@/components/GoogleMap'), { ssr: false });

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
