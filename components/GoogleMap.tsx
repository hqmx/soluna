'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/LanguageContext';

export default function GoogleMap() {
  const { t } = useLanguage();
  // Le Viengping, Chiang Mai 위치
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236.11034155521327!2d99.00728654177668!3d18.764010306410306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da301b8a42796b%3A0x3b8d324167f795a6!2sLe%20Viengping!5e0!3m2!1sko!2sth!4v1763882758603!5m2!1sko!2sth`;

  return (
    <section id="location" className="bg-neutral-50 px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* 섹션 헤더 */}
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-light tracking-wide text-neutral-800 md:text-4xl">
              {t.location.title}
            </h2>
            <div className="mx-auto h-px w-16 bg-primary-500" />
            <p className="text-neutral-600">{t.location.subtitle}</p>
          </div>

          {/* 지도와 주소 정보 */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* 구글 맵 임베드 */}
            <div className="overflow-hidden rounded-lg shadow-md">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SOLUNA 스튜디오 위치"
                className="h-[400px] w-full"
              />
            </div>

            {/* 주소 및 안내 정보 */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-800">{t.location.addressTitle}</h3>
                <p className="text-neutral-600 whitespace-pre-line">
                  {t.location.address}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-800">{t.location.transportTitle}</h3>
                <ul className="space-y-1 text-sm text-neutral-600">
                  {t.location.transport.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-800">{t.location.hoursTitle}</h3>
                <ul className="space-y-1 text-sm text-neutral-600">
                  {t.location.hours.map((item, i) => (
                    <li key={i} className={i === t.location.hours.length - 1 ? "pt-2 text-xs text-neutral-500" : ""}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=18.764010,99.007287`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-500 transition-colors hover:text-primary-600"
              >
                <span>{t.location.viewMap}</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
