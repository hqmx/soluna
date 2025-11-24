'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="bg-white px-4 py-20 md:py-32">
      <div className="mx-auto max-w-4xl">
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
              {t.contact.title}
            </h2>
            <div className="mx-auto h-px w-16 bg-primary-500" />
            <p className="text-neutral-600">
              {t.contact.subtitle}
            </p>
          </div>

          {/* 컨택트 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름 */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                {t.contact.form.name} <span className="text-primary-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder={t.contact.form.placeholderName}
              />
            </div>

            {/* 이메일 */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                {t.contact.form.email} <span className="text-primary-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder={t.contact.form.placeholderEmail}
              />
            </div>

            {/* 전화번호 */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                {t.contact.form.phone}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder={t.contact.form.placeholderPhone}
              />
            </div>

            {/* 메시지 */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                {t.contact.form.message} <span className="text-primary-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder={t.contact.form.placeholderMessage}
              />
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-primary-500 px-8 py-4 font-medium text-white transition-all hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
            </button>

            {/* 상태 메시지 */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-green-50 p-4 text-center text-sm text-green-700"
              >
                {t.contact.form.success}
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-700"
              >
                {t.contact.form.error}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
