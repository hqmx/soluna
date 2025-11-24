'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-white px-4 py-20 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-center"
        >
          {/* 섹션 타이틀 */}
          <h2 className="text-3xl font-light tracking-wide text-neutral-800 md:text-4xl">
            {t.about.title}
          </h2>

          {/* 구분선 */}
          <div className="mx-auto h-px w-16 bg-primary-500" />

          {/* 소개 텍스트 */}
          <div className="space-y-6 text-neutral-600">
            <p className="text-base leading-relaxed md:text-lg whitespace-pre-line">
              {t.about.p1}
            </p>

            <p className="text-sm leading-relaxed md:text-base whitespace-pre-line">
              {t.about.p2}
            </p>

            <p className="text-sm leading-relaxed md:text-base whitespace-pre-line">
              {t.about.p3}
            </p>
          </div>

          {/* 특징 */}
          <div className="grid gap-8 pt-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
                <div className="relative h-8 w-8">
                  <Image
                    src="/images/lotus.png"
                    alt="Lotus"
                    fill
                    className="object-contain"
                    style={{
                      filter:
                        'brightness(0) saturate(100%) invert(46%) sepia(18%) saturate(3364%) hue-rotate(295deg) brightness(93%) contrast(92%)',
                    }}
                  />
                </div>
              </div>
              <h3 className="font-medium text-neutral-800">{t.about.feature1.title}</h3>
              <p className="text-sm text-neutral-600 whitespace-pre-line">
                {t.about.feature1.desc}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
                <div className="relative h-8 w-8">
                  <Image
                    src="/images/yoga.png"
                    alt="Yoga"
                    fill
                    className="object-contain"
                    style={{
                      filter:
                        'brightness(0) saturate(100%) invert(46%) sepia(18%) saturate(3364%) hue-rotate(295deg) brightness(93%) contrast(92%)',
                    }}
                  />
                </div>
              </div>
              <h3 className="font-medium text-neutral-800">{t.about.feature2.title}</h3>
              <p className="text-sm text-neutral-600 whitespace-pre-line">
                {t.about.feature2.desc}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
                <div className="relative h-8 w-8">
                  <Image
                    src="/images/om.png"
                    alt="Om"
                    fill
                    className="object-contain"
                    style={{
                      filter:
                        'brightness(0) saturate(100%) invert(46%) sepia(18%) saturate(3364%) hue-rotate(295deg) brightness(93%) contrast(92%)',
                    }}
                  />
                </div>
              </div>
              <h3 className="font-medium text-neutral-800">{t.about.feature3.title}</h3>
              <p className="text-sm text-neutral-600 whitespace-pre-line">
                {t.about.feature3.desc}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
