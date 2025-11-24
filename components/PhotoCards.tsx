'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/LanguageContext';

const photoImages = [
  '/images/basic.jpg',
  '/images/yoga-2.jpg',
  '/images/yoga-3.jpg',
  '/images/yoga-4.jpg',
  '/images/yoga-5.jpg',
  '/images/yoga-6.jpg',
];

export default function PhotoCards() {
  const { t } = useLanguage();

  return (
    <section id="classes" className="bg-neutral-50 px-4 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 space-y-4 text-center md:mb-16"
        >
          <h2 className="text-3xl font-light tracking-wide text-neutral-800 md:text-4xl">
            {t.classes.title}
          </h2>
          <div className="mx-auto h-px w-16 bg-primary-500" />
          <p className="text-neutral-600">
            {t.classes.subtitle}
          </p>
        </motion.div>

        {/* 포토 그리드 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.classes.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl"
            >
              {/* 이미지 */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                <Image
                  src={photoImages[index]}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* 텍스트 컨텐츠 */}
              <div className="p-6">
                <h3 className="mb-2 text-lg font-medium text-neutral-800">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {item.desc}
                </p>
              </div>

              {/* 호버 시 나타나는 추가 정보 (옵션) */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-primary-500/95 p-6 text-white transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-sm">{t.classes.moreInfo}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
