<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import PremiumNav from './components/PremiumNav.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import StatCounter from './components/StatCounter.vue';
import CardSwap from './components/CardSwap.vue';
import TermsAndConditions from './components/TermsAndConditions.vue';
import PrivacyPolicy from './components/PrivacyPolicy.vue';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const savedTheme = localStorage.getItem('fabneon-theme') as 'light' | 'dark' | null;
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = systemPrefersDark ? 'dark' : 'light';
const theme = ref<'light' | 'dark'>(savedTheme || defaultTheme);

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem('fabneon-theme', theme.value);
  document.documentElement.setAttribute('data-theme', theme.value);
};

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' }
];

const currentPage = ref('home');

const navigateTo = (page: string) => {
  currentPage.value = page;
  window.scrollTo(0, 0);
};

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value);
  document.documentElement.classList.remove('light-theme-loader');

  nextTick(() => {
    // Re-initialize GSAP animations
    gsap.utils.toArray('.reveal-up, .reveal-left, .reveal-right').forEach((element: any) => {
      element.classList.remove('invisible-until-scroll');
      
      let xOffset = 0;
      let yOffset = 30;
      
      if (element.classList.contains('reveal-left')) {
        xOffset = -50;
        yOffset = 0;
      } else if (element.classList.contains('reveal-right')) {
        xOffset = 50;
        yOffset = 0;
      }

      gsap.fromTo(element, 
        { x: xOffset, y: yOffset, opacity: 0 }, 
        {
          scrollTrigger: { trigger: element, start: 'top 90%' },
          x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
        }
      );
    });

    const staggerContainers = ['.services-grid', '.portfolio-grid', '.tech-grid', '.team-grid', '.process-grid', '.testimonials-grid', '.impact-stats-container'];
    staggerContainers.forEach(containerSelector => {
      const container = document.querySelector(containerSelector);
      if (!container) return;
      const children = container.querySelectorAll('.reveal-stagger-child');
      if (!children.length) return;
      
      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(children, 
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
              onStart: () => children.forEach(c => c.classList.remove('invisible-until-scroll'))
            }
          );
        },
        once: true
      });
    });

    // FAQ Accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item?.classList.contains('active');
        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
        if (!isActive && item) item.classList.add('active');
      });
    });
  });
});
</script>

<template>
  <div>
    <LoadingScreen :theme="theme" />
    
    <PremiumNav
      :theme="theme"
      :items="navItems"
      @toggle-theme="toggleTheme"
    />

    <!-- Main Content -->
    <main v-if="currentPage === 'home'">
      <!-- 1. Hero Section -->
      <section class="hero" id="home">
        <div class="hero-bg-glow"></div>
        <div class="hero-bg-glow-2"></div>
        
        <div class="container">
          <div class="grid md:grid-cols-2 gap-8 items-center h-full">
            <div class="hero-content text-left md:text-left mx-0 max-w-none relative z-20">
              <div class="badge badge-purple reveal-up invisible-until-scroll" style="margin-bottom: var(--space-md); display: inline-flex;">
                Innovation Driven IT Solutions
              </div>
              
              <h1 class="display reveal-up invisible-until-scroll" style="animation-delay: 0.1s;">
                We Build The <br>
                <span class="text-gradient">Future of Tech</span>
              </h1>
              
              <p class="lead reveal-up invisible-until-scroll" style="animation-delay: 0.2s; max-width: 500px; margin: 0;">
                Fabneon is a premier technology partner delivering scalable software, ERP systems, and digital experiences that drive business transformation.
              </p>
              
              <div class="hero-cta reveal-up invisible-until-scroll flex flex-wrap justify-start gap-4" style="animation-delay: 0.3s; margin-top: var(--space-xl);">
                <a href="#portfolio" class="btn btn-primary btn-lg magnetic">Explore Our Work</a>
                <a href="#services" class="btn btn-outline-purple btn-lg magnetic">Our Services</a>
              </div>
            </div>

            <!-- CardSwap Showcase -->
            <div class="relative w-full h-[350px] md:h-[500px] z-10 mt-12 md:mt-0 translate-y-4 md:translate-y-[60px]">
              <CardSwap 
                :card-distance="60"
                :vertical-distance="70"
                :delay="5000"
                :pause-on-hover="false"
              >
                <!-- Card 1 -->
                <div class="absolute top-1/2 left-1/2 w-full h-full rounded-2xl flex flex-col justify-end text-left overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden]" style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2);">
                  <img src="/assets/images/card_scalable.png" alt="Scalable Solutions" class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-110" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/50 to-transparent z-10"></div>
                  
                  <div class="relative z-20">
                    <div class="w-10 h-10 rounded-full bg-[var(--bg-primary)]/80 backdrop-blur-sm flex items-center justify-center text-[var(--brand-teal)] mb-4 border border-white/10" style="margin-bottom: 1rem;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-1" style="color: #ffffff;">Scalable Solutions</h3>
                    <p class="text-sm" style="color: rgba(255, 255, 255, 0.8);">Built for the future of tech.</p>
                  </div>
                </div>
                
                <!-- Card 2 -->
                <div class="absolute top-1/2 left-1/2 w-full h-full rounded-2xl flex flex-col justify-end text-left overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden]" style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2);">
                  <img src="/assets/images/card_uiux.png" alt="Stunning UI/UX" class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-110" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/50 to-transparent z-10"></div>
                  
                  <div class="relative z-20">
                    <div class="w-10 h-10 rounded-full bg-[var(--bg-primary)]/80 backdrop-blur-sm flex items-center justify-center text-[var(--brand-purple)] mb-4 border border-white/10" style="margin-bottom: 1rem;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-1" style="color: #ffffff;">Stunning UI/UX</h3>
                    <p class="text-sm" style="color: rgba(255, 255, 255, 0.8);">Design that drives transformation.</p>
                  </div>
                </div>
                
                <!-- Card 3 -->
                <div class="absolute top-1/2 left-1/2 w-full h-full rounded-2xl flex flex-col justify-end text-left overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden]" style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2);">
                  <img src="/assets/images/card_growth.png" alt="Business Growth" class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-110" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/50 to-transparent z-10"></div>
                  
                  <div class="relative z-20">
                    <div class="w-10 h-10 rounded-full bg-[var(--bg-primary)]/80 backdrop-blur-sm flex items-center justify-center text-[var(--brand-gold)] mb-4 border border-white/10" style="margin-bottom: 1rem;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-1" style="color: #ffffff;">Business Growth</h3>
                    <p class="text-sm" style="color: rgba(255, 255, 255, 0.8);">Empowering your enterprise.</p>
                  </div>
                </div>
              </CardSwap>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Services Section -->
      <section class="section" id="services">
        <div class="container">
          <div class="section-header text-center reveal-up invisible-until-scroll">
            <div class="badge mb-4">What We Do</div>
            <h2>Our Expertise</h2>
            <p class="lead">Delivering cutting-edge solutions across the entire technology stack.</p>
          </div>
          
          <div class="services-grid grid-3">
            <div class="service-card reveal-stagger-child invisible-until-scroll">
              <div class="service-icon" style="color: var(--brand-teal);">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path></svg>
              </div>
              <h3>Software Development</h3>
              <p class="text-secondary">Custom software solutions tailored to your unique business requirements and scalable for the future.</p>
            </div>
            <div class="service-card reveal-stagger-child invisible-until-scroll">
              <div class="service-icon" style="color: var(--brand-purple);">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="14" rx="2"></rect><rect width="20" height="8" x="2" y="2" rx="2"></rect><line x1="6" x2="6.01" y1="6" y2="6"></line><line x1="6" x2="6.01" y1="18" y2="18"></line></svg>
              </div>
              <h3>ERP Systems</h3>
              <p class="text-secondary">Enterprise resource planning systems to streamline operations and enhance productivity.</p>
            </div>
            <div class="service-card reveal-stagger-child invisible-until-scroll">
              <div class="service-icon" style="color: var(--brand-gold);">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>
              </div>
              <h3>Mobile Apps</h3>
              <p class="text-secondary">High-performance native and cross-platform mobile applications for iOS and Android.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Process Section -->
      <section class="section section-alt" id="process">
        <div class="container">
          <div class="section-header text-center reveal-up invisible-until-scroll">
            <div class="badge badge-purple mb-4">How We Work</div>
            <h2>Our Proven Process</h2>
            <p class="lead">From initial discovery to final deployment, we ensure a seamless journey.</p>
          </div>
          
          <div class="process-grid grid md:grid-cols-3 gap-8 mt-12 relative">
            <div class="process-step reveal-stagger-child invisible-until-scroll">
              <div class="step-number text-[3rem] font-bold text-[var(--border-muted)] opacity-50 mb-2">01</div>
              <h3 class="mb-2">Planning & Analysis</h3>
              <p class="text-sm text-[var(--text-secondary)]">We gather requirements, define project scope, and establish a strategic roadmap for success.</p>
            </div>
            <div class="process-step reveal-stagger-child invisible-until-scroll">
              <div class="step-number text-[3rem] font-bold text-[var(--border-muted)] opacity-50 mb-2">02</div>
              <h3 class="mb-2">Design & Prototyping</h3>
              <p class="text-sm text-[var(--text-secondary)]">Our UI/UX team creates beautiful, intuitive wireframes and interactive prototypes.</p>
            </div>
            <div class="process-step reveal-stagger-child invisible-until-scroll">
              <div class="step-number text-[3rem] font-bold text-[var(--border-muted)] opacity-50 mb-2">03</div>
              <h3 class="mb-2">Development</h3>
              <p class="text-sm text-[var(--text-secondary)]">We write clean, modular code building robust, scalable architecture using modern technologies.</p>
            </div>
            <div class="process-step reveal-stagger-child invisible-until-scroll">
              <div class="step-number text-[3rem] font-bold text-[var(--border-muted)] opacity-50 mb-2">04</div>
              <h3 class="mb-2">Testing & QA</h3>
              <p class="text-sm text-[var(--text-secondary)]">Rigorous automated and manual testing to ensure security, performance, and reliability.</p>
            </div>
            <div class="process-step reveal-stagger-child invisible-until-scroll">
              <div class="step-number text-[3rem] font-bold text-[var(--border-muted)] opacity-50 mb-2">05</div>
              <h3 class="mb-2">Deployment</h3>
              <p class="text-sm text-[var(--text-secondary)]">A seamless launch process with CI/CD pipelines ensuring zero downtime.</p>
            </div>
            <div class="process-step reveal-stagger-child invisible-until-scroll">
              <div class="step-number text-[3rem] font-bold text-[var(--border-muted)] opacity-50 mb-2">06</div>
              <h3 class="mb-2">Maintenance & Support</h3>
              <p class="text-sm text-[var(--text-secondary)]">Continuous monitoring, updates, and optimization to keep your system performing at its best.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3.5. Impact & Stats Section -->
      <section class="section" id="impact">
        <div class="container">
          <div class="section-header text-center reveal-up invisible-until-scroll">
            <div class="badge badge-gold mb-4">Our Impact</div>
            <h2>Numbers That Matter</h2>
          </div>
          <div class="impact-stats-container grid md:grid-cols-4 gap-6">
            <StatCounter :value="150" suffix="+" label="Projects Delivered" class="reveal-stagger-child invisible-until-scroll" />
            <StatCounter :value="40" suffix="+" label="Countries Served" class="reveal-stagger-child invisible-until-scroll" />
            <StatCounter :value="99" suffix="%" label="Client Retention" class="reveal-stagger-child invisible-until-scroll" />
            <StatCounter :value="25" suffix="M+" label="Lines of Code" class="reveal-stagger-child invisible-until-scroll" />
          </div>
        </div>
      </section>

      <!-- 4. Testimonials Section -->
      <section class="section" id="testimonials">
        <div class="container">
          <div class="section-header text-center reveal-up invisible-until-scroll">
            <div class="badge mb-4">Client Stories</div>
            <h2>Don't Just Take Our Word</h2>
          </div>
          
          <div class="testimonials-grid grid-3">
            <div class="testimonial-card reveal-stagger-child invisible-until-scroll">
              <p class="testimonial-text mb-6">"Fabneon completely transformed our legacy ERP system. Their attention to detail and modern architecture drastically improved our operational efficiency."</p>
              <div class="testimonial-author flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=32" alt="Sarah J." class="w-12 h-12 rounded-full object-cover">
                <div class="author-info">
                  <h4 class="m-0 text-base">Sarah Jenkins</h4>
                  <span class="text-sm text-[var(--text-secondary)]">CTO, GlobalNet</span>
                </div>
              </div>
            </div>
            <div class="testimonial-card reveal-stagger-child invisible-until-scroll">
              <p class="testimonial-text mb-6">"The mobile app they built for us exceeded all expectations. Beautiful UI, buttery smooth performance, and delivered ahead of schedule."</p>
              <div class="testimonial-author flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=11" alt="Michael R." class="w-12 h-12 rounded-full object-cover">
                <div class="author-info">
                  <h4 class="m-0 text-base">Michael Reeves</h4>
                  <span class="text-sm text-[var(--text-secondary)]">Founder, Apex</span>
                </div>
              </div>
            </div>
            <div class="testimonial-card reveal-stagger-child invisible-until-scroll">
              <p class="testimonial-text mb-6">"Their team's expertise in React and Node.js is unmatched. They act more like an internal engineering partner than an outsourced agency."</p>
              <div class="testimonial-author flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=47" alt="Elena V." class="w-12 h-12 rounded-full object-cover">
                <div class="author-info">
                  <h4 class="m-0 text-base">Elena Vance</h4>
                  <span class="text-sm text-[var(--text-secondary)]">VP Engineering, Synthetix</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. FAQ Section -->
      <section class="section section-alt" id="faq">
        <div class="container">
          <div class="faq-grid grid md:grid-cols-2 gap-12">
            <div class="faq-content reveal-up invisible-until-scroll">
              <div class="badge badge-purple mb-4">Got Questions?</div>
              <h2>Frequently Asked Questions</h2>
              <p class="lead mb-8">Everything you need to know about partnering with Fabneon for your next big project.</p>
              <a href="#contact" class="btn btn-secondary magnetic inline-block">Ask Us Directly</a>
            </div>
            <div class="faq-accordion reveal-up invisible-until-scroll">
              <div class="accordion-item mb-4 border border-[var(--border-muted)] rounded-lg overflow-hidden bg-[var(--bg-overlay)]">
                <button class="accordion-header w-full text-left p-6 font-semibold flex justify-between items-center cursor-pointer bg-transparent border-none text-[var(--text-primary)]">
                  <span>What technologies do you specialize in?</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="accordion-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div class="accordion-body px-6 max-h-0 overflow-hidden transition-all duration-300">
                  <p class="pb-6 m-0 text-[var(--text-secondary)]">We specialize in modern web and mobile stacks, including React, Next.js, Vue, Node.js, Python/Django, Flutter, and cloud infrastructure on AWS and Google Cloud.</p>
                </div>
              </div>
              <div class="accordion-item mb-4 border border-[var(--border-muted)] rounded-lg overflow-hidden bg-[var(--bg-overlay)]">
                <button class="accordion-header w-full text-left p-6 font-semibold flex justify-between items-center cursor-pointer bg-transparent border-none text-[var(--text-primary)]">
                  <span>Do you provide ongoing support after launch?</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="accordion-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div class="accordion-body px-6 max-h-0 overflow-hidden transition-all duration-300">
                  <p class="pb-6 m-0 text-[var(--text-secondary)]">Absolutely. We offer dedicated maintenance and support SLAs to ensure your software remains secure, updated, and highly performant post-launch.</p>
                </div>
              </div>
              <div class="accordion-item mb-4 border border-[var(--border-muted)] rounded-lg overflow-hidden bg-[var(--bg-overlay)]">
                <button class="accordion-header w-full text-left p-6 font-semibold flex justify-between items-center cursor-pointer bg-transparent border-none text-[var(--text-primary)]">
                  <span>How do you handle project communication and updates?</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="accordion-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div class="accordion-body px-6 max-h-0 overflow-hidden transition-all duration-300">
                  <p class="pb-6 m-0 text-[var(--text-secondary)]">We use Agile methodologies and provide weekly sprint updates. You'll have a dedicated project manager and access to our Slack channel and Jira board for full transparency.</p>
                </div>
              </div>
              <div class="accordion-item mb-4 border border-[var(--border-muted)] rounded-lg overflow-hidden bg-[var(--bg-overlay)]">
                <button class="accordion-header w-full text-left p-6 font-semibold flex justify-between items-center cursor-pointer bg-transparent border-none text-[var(--text-primary)]">
                  <span>What is your typical project timeline?</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="accordion-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div class="accordion-body px-6 max-h-0 overflow-hidden transition-all duration-300">
                  <p class="pb-6 m-0 text-[var(--text-secondary)]">Timelines vary depending on scope, but a standard MVP typically takes 8-12 weeks from discovery to deployment. Enterprise solutions may take 4-6 months.</p>
                </div>
              </div>
              <div class="accordion-item mb-4 border border-[var(--border-muted)] rounded-lg overflow-hidden bg-[var(--bg-overlay)]">
                <button class="accordion-header w-full text-left p-6 font-semibold flex justify-between items-center cursor-pointer bg-transparent border-none text-[var(--text-primary)]">
                  <span>Can you scale our existing software?</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="accordion-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div class="accordion-body px-6 max-h-0 overflow-hidden transition-all duration-300">
                  <p class="pb-6 m-0 text-[var(--text-secondary)]">Yes, we specialize in modernizing legacy systems, migrating infrastructure to the cloud, and optimizing codebases for high scalability and performance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Contact Section -->
      <section class="section" id="contact">
        <div class="container">
          <div class="contact-grid grid md:grid-cols-2 gap-12">
            <div class="contact-info reveal-left invisible-until-scroll flex flex-col justify-center">
              <div class="badge mb-4 self-start" style="display: inline-flex;">Get In Touch</div>
              <h2 class="mb-4">Contact Information</h2>
              <p class="mb-10 text-[var(--text-secondary)]">Fill out the form and our team will get back to you within 24 hours. We're excited to hear about your project.</p>
              
              <div class="contact-details flex flex-col gap-8">
                <div class="contact-item flex items-start gap-5">
                  <div class="contact-icon-wrapper flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--bg-overlay)] border border-[var(--border-muted)] text-[var(--brand-teal)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </div>
                  <div>
                    <h5 class="m-0 mb-1 text-base font-semibold">Email Us</h5>
                    <a href="mailto:business@fabneon.com" class="text-[var(--text-secondary)] hover:text-[var(--brand-teal-light)] transition-colors">business@fabneon.com</a>
                  </div>
                </div>
                
                <div class="contact-item flex items-start gap-5">
                  <div class="contact-icon-wrapper flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--bg-overlay)] border border-[var(--border-muted)] text-[var(--brand-purple)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h5 class="m-0 mb-1 text-base font-semibold">Call Us</h5>
                    <a href="tel:+8801569149839" class="text-[var(--text-secondary)] hover:text-[var(--brand-purple-light)] transition-colors">+8801569-149839</a>
                  </div>
                </div>
                
                <div class="contact-item flex items-start gap-5">
                  <div class="contact-icon-wrapper flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--bg-overlay)] border border-[var(--border-muted)] text-[var(--brand-gold)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h5 class="m-0 mb-1 text-base font-semibold">Our Address</h5>
                    <p class="m-0 text-[var(--text-secondary)] leading-relaxed max-w-[250px]">Rajshahi, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="contact-form-container reveal-right invisible-until-scroll bg-[var(--bg-overlay)] p-8 rounded-2xl border border-[var(--border-muted)]">
              <form id="contact-form" class="flex-col gap-lg" @submit.prevent>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="form-group flex-col gap-sm">
                    <label class="form-label text-sm font-semibold" for="name">Full Name</label>
                    <input type="text" id="name" class="form-input p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)]" placeholder="John Doe" required>
                  </div>
                  <div class="form-group flex-col gap-sm">
                    <label class="form-label text-sm font-semibold" for="email">Email Address</label>
                    <input type="email" id="email" class="form-input p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)]" placeholder="john@company.com" required>
                  </div>
                </div>
                
                <div class="form-group flex-col gap-sm mt-6">
                  <label class="form-label text-sm font-semibold" for="subject">Subject</label>
                  <input type="text" id="subject" class="form-input p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)]" placeholder="How can we help you?" required>
                </div>
                
                <div class="form-group flex-col gap-sm mt-6">
                  <label class="form-label text-sm font-semibold" for="message">Message</label>
                  <textarea id="message" rows="5" class="form-textarea p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)] resize-none" placeholder="Tell us about your project requirements..." required></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary w-full mt-8 p-4 rounded-lg flex items-center justify-center gap-2 font-semibold">
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <!-- 7. Pre-Footer CTA -->
      <section class="section cta-section pb-0">
        <div class="container">
          <div class="cta-banner reveal-up invisible-until-scroll text-center shadow-2xl">
            <div class="cta-banner-bg"></div>
            <div class="cta-banner-content mx-auto flex flex-col items-center justify-center">
              <h2>Ready to Transform Your Business?</h2>
              <p class="lead mb-10">Let's build something extraordinary together. Our experts are ready to turn your vision into reality.</p>
              <a href="#contact" class="btn btn-primary btn-lg magnetic" style="border-radius: 50px;">Start a Conversation</a>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <!-- Legal Pages -->
    <TermsAndConditions v-else-if="currentPage === 'terms'" @back="navigateTo('home')" />
    <PrivacyPolicy v-else-if="currentPage === 'privacy'" @back="navigateTo('home')" />

    <!-- 8. Footer (Always visible) -->
    <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="logo font-bold text-2xl flex items-center gap-2">
                <img src="/fabneon_logo_only.png" alt="Fabneon" class="h-8" />
                <span>Fabneon</span>
              </div>
              <p class="text-[var(--text-secondary)]">Empowering businesses with scalable software, ERP systems, and state-of-the-art digital experiences.</p>
            </div>
            
            <div class="footer-links-group">
              <h5 class="text-[var(--text-primary)] font-semibold">Services</h5>
              <div class="footer-links">
                <a href="#services">Custom Software</a>
                <a href="#services">ERP Solutions</a>
                <a href="#services">Cloud Architecture</a>
                <a href="#services">UI/UX Design</a>
              </div>
            </div>
            
            <div class="footer-links-group">
              <h5 class="text-[var(--text-primary)] font-semibold">Company</h5>
              <div class="footer-links">
                <a href="#about">About Us</a>
                <a href="#portfolio">Our Work</a>
                <a href="#process">Our Process</a>
                <a href="#contact">Contact</a>
              </div>
            </div>

            <div class="footer-newsletter">
              <h5 class="text-[var(--text-primary)] font-semibold">Stay Updated</h5>
              <p class="text-[var(--text-secondary)] text-sm mb-4">Subscribe to our newsletter for the latest tech insights.</p>
              <form @submit.prevent>
                <input type="email" placeholder="Email address" class="form-input flex-1 p-2 rounded-l-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)]" required>
                <button type="submit" class="btn btn-primary rounded-r-lg p-2" style="border-radius: 0 8px 8px 0;">Subscribe</button>
              </form>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p class="text-[var(--text-muted)] text-sm">&copy; 2023 Fabneon. All rights reserved.</p>
            <div class="footer-bottom-links">
              <a href="#" @click.prevent="navigateTo('privacy')" class="text-[var(--text-muted)] text-sm hover:text-[var(--brand-teal-light)] transition-colors">Privacy Policy</a>
              <a href="#" @click.prevent="navigateTo('terms')" class="text-[var(--text-muted)] text-sm hover:text-[var(--brand-teal-light)] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
  </div>
</template>

<style>
/* Accordion active state overrides */
.accordion-item.active .accordion-body {
  max-height: 200px;
}
</style>
