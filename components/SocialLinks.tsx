'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaInstagram,
  FaBloggerB,
  FaThreads,
} from 'react-icons/fa6';
import { SiNaver } from 'react-icons/si';

import { useLanguage } from '@/contexts/LanguageContext';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

const socialLinksData: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/soo__being',
    icon: <FaInstagram className="h-8 w-8" />,
    color: 'hover:text-pink-500',
  },
  {
    name: 'Note',
    url: 'https://note.com/soo__being',
    icon: <FaBloggerB className="h-8 w-8" />,
    color: 'hover:text-green-500',
  },
  {
    name: 'Threads',
    url: 'https://threads.net/@soo__being',
    icon: <FaThreads className="h-8 w-8" />,
    color: 'hover:text-neutral-800',
  },
  {
    name: 'Naver Blog',
    url: 'https://blog.naver.com/soo__being',
    icon: <SiNaver className="h-8 w-8" />,
    color: 'hover:text-green-600',
  },
];

export default function SocialLinks() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="-translate-y-8 space-y-12"
      >
        {/* 섹션 헤더 */}
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-light tracking-wide md:text-4xl">
            {t.social.title}
          </h2>
          <div className="mx-auto h-px w-16 bg-primary-500" />
          <p className="text-white">
            {t.social.subtitle}
          </p>
        </div>

        {/* 소셜 링크 그리드 */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {socialLinksData.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/20 p-6 text-center shadow-lg backdrop-blur-md transition-all hover:bg-black/30 hover:shadow-xl hover:border-white/20"
            >
              {/* 아이콘 */}
              <div className={`mb-4 flex justify-center transition-colors ${link.color}`}>
                {link.icon}
              </div>

              {/* 플랫폼 이름 */}
              <h3 className="mb-2 text-lg font-medium text-white">{link.name}</h3>

              {/* 설명 */}
              <p className="text-sm text-neutral-200">{t.social.items[index].desc}</p>

              {/* 호버 효과 - 하단 라인 */}
              <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-primary-500 transition-transform duration-300 group-hover:scale-x-100" />
            </motion.a>
          ))}
        </div>

        {/* 추가 정보 */}
        <div className="pt-8 text-center">
          <p className="text-sm text-neutral-400">
            {t.social.footer}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
