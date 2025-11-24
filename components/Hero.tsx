'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/LanguageContext';

interface HeroProps {
  videoSrc?: string;
}

export default function Hero({ videoSrc = '/videos/hero-video.mp4' }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 비디오 배경 */}
      <div className="absolute inset-0 z-0">
        {/* 모바일 배경 동영상 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover md:hidden"
          poster="/images/hero-poster.jpg"
        >
          <source src="/images/mobbg.webm" type="video/webm" />
        </video>

        {/* 웹 배경 동영상 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden h-full w-full object-cover md:block"
          poster="/images/hero-poster.jpg"
        >
          <source src="/images/bg.webm" type="video/webm" />
        </video>

        {/* 오버레이 - 텍스트 가독성 향상 */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 컨텐츠 */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-6"
        >
          {/* 로고/타이틀 */}
          <h1
            className="font-montserrat text-6xl tracking-wider md:text-8xl"
            style={{ fontWeight: 280 }}
          >
            {t.hero.title}
          </h1>

          {/* 서브타이틀 */}
          <p className="text-lg font-light tracking-wide md:text-2xl">
            {t.hero.subtitle}
          </p>

          {/* 구분선 */}
          <div className="mx-auto h-px w-24 bg-white/60" />

          {/* 설명 */}
          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed md:text-base whitespace-pre-line">
            {t.hero.description}
          </p>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-light tracking-widest">{t.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-8 w-px bg-white/60"
          />
        </motion.div>
      </div>
    </section>
  );
}
