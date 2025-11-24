'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'ko', label: '한국어', flag: 'kr' },
        { code: 'en', label: 'English', flag: 'gb' },
        { code: 'ja', label: '日本語', flag: 'jp' },
    ] as const;

    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="flex flex-col gap-2 overflow-hidden rounded-lg bg-white/95 p-2 shadow-lg backdrop-blur-sm"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-3 rounded px-4 py-2 text-sm transition-colors hover:bg-primary-50 ${language === lang.code
                                        ? 'bg-primary-50 font-bold text-primary-500'
                                        : 'text-neutral-600'
                                    }`}
                            >
                                <span className={`fi fi-${lang.flag} text-xl`}></span>
                                <span>{lang.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                aria-label="Change Language"
            >
                <span className={`fi fi-${currentLanguage.flag} text-3xl`}></span>
            </button>
        </div>
    );
}
