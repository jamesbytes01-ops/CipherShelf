import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Mail, ShieldCheck, MapPin, Key, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Zod schema for form validation
const contactSchema = zod.object({
  name: zod.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: zod.string().email({ message: 'Please enter a valid email address.' }),
  subject: zod.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: zod.string().min(10, { message: 'Message must be at least 10 characters.' })
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
    // Clear success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Title */}
      <div className="text-left mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Contact Security Desk
        </h1>
        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed max-w-xl">
          Get in touch with our operations team for orders, catalog suggestions, or security vulnerability disclosures.
        </p>
      </div>

      {/* Grid structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* General Inquiries */}
          <div className="p-6 border border-slate-100 bg-white rounded-2xl flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex-shrink-0 flex items-center justify-center text-slate-800">
              <Mail className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-slate-900 text-sm md:text-base">Support Desk</h3>
              <p className="text-xs text-slate-500">For inquiries regarding orders, refunds, or general queries:</p>
              <a href="mailto:support@cybershelf.com" className="text-xs font-semibold text-accent hover:underline mt-1">
                support@cybershelf.com
              </a>
            </div>
          </div>

          {/* Security Desk */}
          <div className="p-6 border border-slate-100 bg-white rounded-2xl flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex-shrink-0 flex items-center justify-center text-slate-800">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-slate-900 text-sm md:text-base">Vulnerability Reporting</h3>
              <p className="text-xs text-slate-500">To submit security disclosures or report catalog compliance:</p>
              <a href="mailto:security@cybershelf.com" className="text-xs font-semibold text-accent hover:underline mt-1">
                security@cybershelf.com
              </a>
            </div>
          </div>

          {/* Corporate Address */}
          <div className="p-6 border border-slate-100 bg-white rounded-2xl flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex-shrink-0 flex items-center justify-center text-slate-800">
              <MapPin className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-slate-900 text-sm md:text-base">HQ Location</h3>
              <p className="text-xs text-slate-500">CyberShelf Inc.</p>
              <p className="text-xs text-slate-500">100 Security Blvd, Floor 4</p>
              <p className="text-xs text-slate-500">San Francisco, CA 94105</p>
            </div>
          </div>

          {/* PGP Key Info */}
          <div className="p-6 border border-slate-100 bg-slate-50/50 rounded-2xl flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex-shrink-0 flex items-center justify-center text-slate-800">
              <Key className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">PGP Fingerprint</h3>
              <code className="text-[10px] bg-slate-100/80 px-2 py-1 rounded text-slate-700 select-all font-mono">
                9F2E D48A C110 B45E A791
              </code>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 bg-white border border-slate-100 p-8 rounded-[24px] shadow-card">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register('name')}
                  className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                    errors.name 
                      ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                      : 'border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400'
                  }`}
                />
                {errors.name && (
                  <span className="text-[10px] text-red-600 font-semibold">{errors.name.message}</span>
                )}
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register('email')}
                  className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                      : 'border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400'
                  }`}
                />
                {errors.email && (
                  <span className="text-[10px] text-red-600 font-semibold">{errors.email.message}</span>
                )}
              </div>
            </div>

            {/* Subject field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subject</label>
              <input
                type="text"
                placeholder="Inquiry regarding..."
                {...register('subject')}
                className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                  errors.subject 
                    ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                    : 'border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400'
                }`}
              />
              {errors.subject && (
                <span className="text-[10px] text-red-600 font-semibold">{errors.subject.message}</span>
              )}
            </div>

            {/* Message field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Message Details</label>
              <textarea
                rows={5}
                placeholder="Details of your request..."
                {...register('message')}
                className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none ${
                  errors.message 
                    ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                    : 'border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400'
                }`}
              />
              {errors.message && (
                <span className="text-[10px] text-red-600 font-semibold">{errors.message.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="mt-2 w-full sm:w-auto self-end px-8 justify-center"
              icon={isSubmitting ? null : <Send className="w-4 h-4" />}
            >
              {isSubmitting ? 'Verifying Dispatch...' : 'Send Message'}
            </Button>

            {/* Success message banner */}
            {submitSuccess && (
              <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-medium animate-fade-in mt-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  Your message has been signed and dispatched successfully. A support analyst will contact you shortly.
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
