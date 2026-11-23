<script setup lang="ts">
import { ref } from 'vue';

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isContactSubmitting = ref(false);
const contactSent = ref(false);

const handleContactSubmit = () => {
  if (!contactForm.value.name.trim() || !contactForm.value.email.trim() || !contactForm.value.message.trim()) return;
  isContactSubmitting.value = true;
  
  const recipient = 'business@fabneon.com';
  const mailSubject = encodeURIComponent(`[Fabneon Enterprise Inquiry] ${contactForm.value.subject || 'Project Consultation'}`);
  const mailBody = encodeURIComponent(
    `Hello Fabneon Engineering Team,\n\n` +
    `Client Name: ${contactForm.value.name}\n` +
    `Client Email: ${contactForm.value.email}\n` +
    `Project Scope: ${contactForm.value.subject || 'Not Specified'}\n\n` +
    `Project Requirements:\n${contactForm.value.message}\n\n` +
    `---\n` +
    `Sent from Fabneon Official Portal (https://fabneon.com)`
  );

  const mailtoUri = `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;
  const a = document.createElement('a');
  a.href = mailtoUri;
  a.click();

  setTimeout(() => {
    isContactSubmitting.value = false;
    contactSent.value = true;
  }, 400);
};

const resetContactForm = () => {
  contactForm.value = { name: '', email: '', subject: '', message: '' };
  contactSent.value = false;
};
</script>

<template>
  <section class="section" id="contact" style="padding-top: 5.5rem; padding-bottom: 5.5rem; scroll-margin-top: 110px;">
    <div class="container">
      <div class="contact-grid grid md:grid-cols-2 gap-12">
        <div class="contact-info reveal-left flex flex-col justify-center">
          <div class="badge mb-4 self-start inline-flex">Get In Touch</div>
          <h2 class="mb-4 text-3xl md:text-4xl font-extrabold">Contact Fabneon Technologies Limited</h2>
          <p class="mb-10 text-[var(--text-secondary)] leading-relaxed">
            Connect with our software architects to discuss your enterprise ERP, SaaS product, or digital transformation roadmap.
          </p>

          <div class="contact-details flex flex-col gap-6 sm:gap-8">
            <div class="contact-item flex items-center gap-5">
              <div
                class="contact-icon-wrapper flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--bg-overlay)] border border-[var(--border-muted)] text-[var(--brand-teal)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <div>
                <h3 class="m-0 mb-1 text-base font-semibold">Email Us</h3>
                <a href="mailto:business@fabneon.com"
                  class="text-[var(--text-secondary)] hover:text-[var(--brand-teal-light)] transition-colors">business@fabneon.com</a>
              </div>
            </div>

            <div class="contact-item flex items-center gap-5">
              <div
                class="contact-icon-wrapper flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--bg-overlay)] border border-[var(--border-muted)] text-[var(--brand-purple)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                  </path>
                </svg>
              </div>
              <div>
                <h3 class="m-0 mb-1 text-base font-semibold">Direct Corporate Phone</h3>
                <a href="tel:+8801569149839"
                  class="text-[var(--text-secondary)] hover:text-[var(--brand-purple-light)] transition-colors">+8801569-149839</a>
              </div>
            </div>

            <div class="contact-item flex items-center gap-5">
              <div
                class="contact-icon-wrapper flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--bg-overlay)] border border-[var(--border-muted)] text-[var(--brand-gold)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 class="m-0 mb-1 text-base font-semibold">Headquarters</h3>
                <p class="m-0 text-[var(--text-secondary)] leading-relaxed max-w-[250px]">Rajshahi &amp; Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="contact-form-container reveal-right bg-[var(--bg-overlay)] p-5 md:p-8 rounded-2xl border border-[var(--border-muted)] shadow-xl">
          
          <!-- Success State -->
          <div v-if="contactSent" class="p-6 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/30 text-center">
            <div class="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Inquiry Prepared for business@fabneon.com!</h3>
            <p class="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto leading-relaxed">
              Your email client has been opened with your inquiry pre-addressed to <strong>business@fabneon.com</strong>. If your email application did not launch automatically, you can send directly or message us on WhatsApp.
            </p>
            <div class="flex flex-wrap items-center justify-center gap-3">
              <a 
                :href="`mailto:business@fabneon.com?subject=${encodeURIComponent('[Fabneon Inquiry] ' + (contactForm.subject || 'Consultation'))}&body=${encodeURIComponent(contactForm.message)}`" 
                class="btn btn-primary text-xs font-bold px-4 py-2.5 rounded-xl inline-flex items-center gap-2"
              >
                <span>Open Mail Client</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
              <a 
                href="https://wa.me/8801569149839" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/25 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>WhatsApp Lead Architect</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
            <div class="mt-6">
              <button @click="resetContactForm" class="text-xs text-[var(--text-muted)] hover:text-white underline cursor-pointer">
                Send another inquiry
              </button>
            </div>
          </div>

          <!-- Form -->
          <form v-else id="contact-form" class="flex-col gap-lg" @submit.prevent="handleContactSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group flex flex-col gap-sm">
                <label class="form-label text-sm font-semibold" for="name">Full Name</label>
                <input type="text" id="name"
                  v-model="contactForm.name"
                  class="form-input w-full p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)]"
                  placeholder="e.g. Tariqul Islam" required>
              </div>
              <div class="form-group flex flex-col gap-sm">
                <label class="form-label text-sm font-semibold" for="email">Email Address</label>
                <input type="email" id="email"
                  v-model="contactForm.email"
                  class="form-input w-full p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)]"
                  placeholder="client@enterprise.com" required>
              </div>
            </div>

            <div class="form-group flex flex-col gap-sm mt-6">
              <label class="form-label text-sm font-semibold" for="subject">Project Scope</label>
              <input type="text" id="subject"
                v-model="contactForm.subject"
                class="form-input w-full p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)]"
                placeholder="e.g. Enterprise ERP, SaaS Platform, Healthcare OS" required>
            </div>

            <div class="form-group flex flex-col gap-sm mt-6">
              <label class="form-label text-sm font-semibold" for="message">Project Requirements</label>
              <textarea id="message" rows="5"
                v-model="contactForm.message"
                class="form-textarea w-full p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)] resize-none"
                placeholder="Tell us about your business workflow, target scale, and technical goals..." required></textarea>
            </div>

            <button type="submit"
              :disabled="isContactSubmitting"
              class="btn btn-primary w-full mt-8 p-4 rounded-lg flex items-center justify-center gap-2 font-semibold cursor-pointer">
              <span>{{ isContactSubmitting ? 'Opening Mail Client...' : 'Send Inquiry to business@fabneon.com' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Pre-Footer CTA -->
  <section class="section cta-section pb-0">
    <div class="container">
      <div class="cta-banner text-center shadow-2xl">
        <div class="cta-banner-bg"></div>
        <div class="cta-banner-content mx-auto flex flex-col items-center justify-center">
          <h2 class="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Transform Your Business?</h2>
          <p class="lead mb-10 max-w-xl">Let's build something extraordinary together. Our architects and engineers are ready to turn your vision into reality.</p>
          <a href="#contact" class="btn btn-primary btn-lg magnetic" style="border-radius: 50px;">Start a Conversation</a>
        </div>
      </div>
    </div>
  </section>
</template>
