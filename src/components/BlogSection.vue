<script setup lang="ts">
import { ref, computed } from 'vue';
import { type BlogPost, blogPosts } from '../data/blogPosts';

const emit = defineEmits<{
  (e: 'select-post', post: BlogPost): void;
}>();

const selectedCategory = ref<string>('All');
const searchQuery = ref<string>('');

const categories = computed(() => {
  const cats = new Set(blogPosts.map(p => p.category));
  return ['All', ...Array.from(cats)];
});

const filteredPosts = computed(() => {
  return blogPosts.filter(post => {
    const matchesCategory = selectedCategory.value === 'All' || post.category === selectedCategory.value;
    const query = searchQuery.value.toLowerCase().trim();
    const matchesQuery = !query || 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });
});

const featuredPost = computed(() => {
  return filteredPosts.value.find(p => p.featured) || filteredPosts.value[0];
});

const regularPosts = computed(() => {
  if (!featuredPost.value) return filteredPosts.value;
  return filteredPosts.value.filter(p => p.id !== featuredPost.value.id);
});

const handleSelectPost = (post: BlogPost) => {
  emit('select-post', post);
};
</script>

<template>
  <section class="section" id="blog" style="padding-top: 6.5rem; padding-bottom: 6rem; scroll-margin-top: 110px;">
    <div class="container max-w-7xl mx-auto px-4">
      
      <!-- Section Header -->
      <div class="section-header text-center reveal-up">
        <div class="badge badge-purple mb-4">Engineering & Industry Insights</div>
        <h2 class="text-3xl md:text-5xl font-bold mb-4">
          Insights on <span class="text-gradient">Software, AI & Architecture</span>
        </h2>
        <p class="lead max-w-3xl mx-auto">
          Deep-dives into enterprise software engineering, regional tech industry rankings, applied AI algorithms, and mission-critical cloud platforms.
        </p>
      </div>

      <!-- Filter Controls: Search & Category Pills -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 mb-8">
        
        <!-- Category Filter Pills -->
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="selectedCategory = cat"
            :class="[
              'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap',
              selectedCategory === cat 
                ? 'bg-gradient-to-r from-[var(--brand-teal)] to-cyan-500 text-slate-950 font-bold shadow-lg shadow-[var(--brand-teal)]/25' 
                : 'bg-white/[0.04] text-[var(--text-secondary)] border border-white/10 hover:text-white hover:border-[var(--brand-teal-light)]/40'
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Instant Keyword Search -->
        <div class="relative w-full md:w-72">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search Rajshahi, AI, ERP..."
            class="w-full px-4 py-2 pl-9 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-teal)] transition-colors"
          />
          <svg class="absolute left-3 top-2.5 w-3.5 h-3.5 text-[var(--text-muted)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Featured Hero Article (If matches filter) -->
      <div 
        v-if="featuredPost" 
        class="featured-blog-card rounded-3xl bg-[var(--bg-secondary)] border border-white/10 overflow-hidden p-6 md:p-8 mb-8 shadow-xl transition-all duration-300 hover:border-[var(--brand-teal-light)]/50 hover:shadow-2xl hover:shadow-[var(--brand-teal-light)]/10 group cursor-pointer"
        @click="handleSelectPost(featuredPost)"
      >
        <div class="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          <!-- Thumbnail -->
          <div class="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-video bg-black/50 border border-white/10 shadow-lg group">
            <img 
              :src="featuredPost.featuredImage" 
              :alt="featuredPost.title" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              loading="lazy"
            />
            <div class="absolute top-3 left-3">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[var(--brand-teal-light)] border border-[var(--brand-teal-light)]/30 shadow-md">
                ★ Featured Analysis
              </span>
            </div>
          </div>

          <!-- Featured Info -->
          <div class="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-2.5">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--brand-teal)]/15 text-[var(--brand-teal-light)] border border-[var(--brand-teal)]/30">
                  {{ featuredPost.category }}
                </span>
                <span class="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                  <span>{{ featuredPost.publishDate }}</span>
                  <span>•</span>
                  <span>{{ featuredPost.readTime }}</span>
                </span>
              </div>

              <h3 class="text-xl md:text-2xl lg:text-3xl font-extrabold text-white mb-3 group-hover:text-[var(--brand-teal-light)] transition-colors leading-snug">
                {{ featuredPost.title }}
              </h3>

              <p class="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
                {{ featuredPost.excerpt }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mb-5">
                <span 
                  v-for="tag in featuredPost.tags.slice(0, 4)" 
                  :key="tag"
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] text-[var(--text-secondary)] border border-white/10"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>

            <!-- Author & Action -->
            <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div class="flex items-center gap-3">
                <img :src="featuredPost.author.avatar" :alt="featuredPost.author.name" class="w-8 h-8 rounded-full bg-white/10 p-1" />
                <div>
                  <h4 class="text-xs font-bold text-white m-0 leading-tight">{{ featuredPost.author.name }}</h4>
                  <p class="text-[10px] text-[var(--text-muted)] m-0">{{ featuredPost.author.role }}</p>
                </div>
              </div>

              <button 
                class="btn-blog-action inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer transition-all"
                style="background: linear-gradient(135deg, #00A3C4 0%, #4B1A7F 100%);"
                @click.stop="handleSelectPost(featuredPost)"
              >
                <span>Read Full Article</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Articles Grid (Horizontal 4-Column Grid) -->
      <div v-if="regularPosts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <article 
          v-for="post in regularPosts" 
          :key="post.id"
          class="blog-card rounded-2xl md:rounded-3xl bg-[var(--bg-secondary)] border border-white/10 p-5 flex flex-col justify-between transition-all duration-300 hover:border-[var(--brand-teal-light)]/50 hover:shadow-2xl hover:shadow-[var(--brand-teal-light)]/10 hover:-translate-y-1.5 cursor-pointer group"
          @click="handleSelectPost(post)"
        >
          <div>
            <!-- Thumbnail Image -->
            <div class="relative rounded-xl overflow-hidden aspect-[16/10] bg-black/40 border border-white/10 mb-4 group-hover:border-[var(--brand-teal-light)]/40 transition-colors">
              <img 
                :src="post.featuredImage" 
                :alt="post.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div class="absolute top-2.5 left-2.5">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/80 backdrop-blur-md text-[var(--brand-teal-light)] border border-[var(--brand-teal-light)]/30 shadow-md">
                  {{ post.category }}
                </span>
              </div>
            </div>

            <!-- Read Time & Date -->
            <div class="text-[11px] font-medium text-[var(--text-muted)] mb-1 flex items-center gap-1.5">
              <span>{{ post.readTime }}</span>
              <span>•</span>
              <span>{{ post.publishDate }}</span>
            </div>

            <!-- Title -->
            <h3 class="text-base font-bold text-white mb-2 group-hover:text-[var(--brand-teal-light)] transition-colors leading-snug line-clamp-2">
              {{ post.title }}
            </h3>

            <!-- Excerpt -->
            <p class="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
              {{ post.excerpt }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              <span 
                v-for="tag in post.tags.slice(0, 2)" 
                :key="tag"
                class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] text-[var(--text-secondary)] border border-white/10"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Card Action Footer -->
          <div class="flex items-center justify-between pt-3.5 border-t border-white/10 mt-auto">
            <button 
              class="btn-blog-action inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-sm cursor-pointer transition-all"
              style="background: linear-gradient(135deg, #00A3C4 0%, #4B1A7F 100%);"
              @click.stop="handleSelectPost(post)"
            >
              <span>Read Article</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else-if="!featuredPost && filteredPosts.length === 0" class="text-center py-16 rounded-3xl bg-[var(--bg-secondary)] border border-white/10">
        <p class="text-base text-[var(--text-secondary)]">No articles found matching "{{ searchQuery }}"</p>
        <button @click="searchQuery = ''; selectedCategory = 'All'" class="btn btn-outline-purple btn-sm mt-3">Reset Filters</button>
      </div>

    </div>
  </section>
</template>

<style scoped>
.featured-blog-card,
.blog-card {
  position: relative;
}

[data-theme='dark'] .featured-blog-card,
[data-theme='dark'] .blog-card {
  background: rgba(18, 20, 26, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

[data-theme='light'] .featured-blog-card,
[data-theme='light'] .blog-card {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(0, 0, 0, 0.08);
}

.btn-blog-action:hover {
  background: linear-gradient(135deg, #00BCE0 0%, #5C2299 100%) !important;
  box-shadow: 0 6px 20px rgba(0, 163, 196, 0.4) !important;
  transform: translateY(-1px);
}
</style>
