'use client';

import React from 'react';
import Image from 'next/image';
import SocialLinks from './SocialLinks';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden px-4 text-neutral-400">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer.jpg"
          alt="Footer background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-neutral-950/20" />
      </div>

      {/* 컨텐츠 */}
      <div className="relative z-10 text-white">
        {/* SocialLinks 섹션 */}
        <SocialLinks />

        {/* 구분선 */}
        <div className="mx-auto max-w-6xl">
          <div className="h-px bg-neutral-700/50" />
        </div>

        {/* Footer 정보 */}
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {/* 브랜드 */}
            <div className="space-y-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-block cursor-pointer transition-opacity hover:opacity-80"
              >
                <h3
                  className="font-montserrat text-2xl tracking-wider text-white"
                  style={{ fontWeight: 280 }}
                >
                  SOLUNA
                </h3>
              </a>
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {t.footer.desc}
              </p>
            </div>

            {/* 빠른 링크 */}
            <div className="space-y-4">
              <h4 className="font-medium text-white">{t.footer.quickLinks}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#about"
                    className="transition-colors hover:text-primary-400"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#classes"
                    className="transition-colors hover:text-primary-400"
                  >
                    Classes
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="transition-colors hover:text-primary-400"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#location"
                    className="transition-colors hover:text-primary-400"
                  >
                    Location
                  </a>
                </li>
              </ul>
            </div>

            {/* 연락처 */}
            <div className="space-y-4">
              <h4 className="font-medium text-white">{t.footer.contactInfo}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:yogasoluna0@gmail.com"
                    className="transition-colors hover:text-primary-400"
                  >
                    yogasoluna0@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://line.me/ti/p/~kyawatan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary-400"
                  >
                    LINE : @kyawatan.
                  </a>
                </li>
                <li>
                  <a
                    href="https://open.kakao.com/o/kyawatan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary-400"
                  >
                    KakaoTalk : @kyawatan.
                  </a>
                </li>
                <li className="pt-2 whitespace-pre-line">
                  {t.location.address}
                </li>
              </ul>
            </div>
          </div>

          {/* 하단 구분선 */}
          <div className="my-8 h-px bg-neutral-700/50" />

          {/* 저작권 */}
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <p>© {currentYear} SOLUNA. {t.footer.rights}</p>
            <div className="flex gap-6">
              <a href="/privacy" className="transition-colors hover:text-primary-400">
                {t.footer.privacy}
              </a>
              <a href="/terms" className="transition-colors hover:text-primary-400">
                {t.footer.terms}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
