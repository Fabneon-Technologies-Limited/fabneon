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
  <section class="section" id="blog" style="padding-top: 4rem; padding-bottom: 5rem;">
    <div class="container">
      
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
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 mb-10">
        
        <!-- Category Filter Pills -->
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="selectedCategory = cat"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap',
              selectedCategory === cat 
                ? 'bg-[var(--brand-teal)] text-slate-950 font-bold shadow-lg shadow-[var(--brand-teal)]/20' 
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-muted)] hover:text-white hover:border-[var(--brand-teal)]/40'
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
            class="w-full px-4 py-2.5 pl-9 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-teal)] transition-colors"
          />
          <svg class="absolute left-3 top-3 w-4 h-4 text-[var(--text-muted)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Featured Hero Article (If matches filter) -->
      <div 
        v-if="featuredPost" 
        class="featured-blog-card rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] overflow-hidden p-6 md:p-10 mb-8 shadow-2xl transition-all hover:border-[var(--brand-teal)]/50 group cursor-pointer"
        @click="handleSelectPost(featuredPost)"
      >
        <div class="grid lg:grid-cols-12 gap-8 items-center">
          
          <!-- Thumbnail -->
          <div class="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-video bg-black/50 border border-white/10 shadow-lg group">
            <img 
              :src="featuredPost.featuredImage" 
              :alt="featuredPost.title" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--brand-teal)] text-slate-950 shadow-md">
                ★ Featured Analysis
              </span>
            </div>
          </div>

          <!-- Featured Info -->
          <div class="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-3">
                <span class="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--brand-teal)]/15 text-[var(--brand-teal)] border border-[var(--brand-teal)]/30">
                  {{ featuredPost.category }}
                </span>
                <span class="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                  <span>{{ featuredPost.publishDate }}</span>
                  <span>•</span>
                  <span>{{ featuredPost.readTime }}</span>
                </span>
              </div>

              <h3 class="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] mb-3 group-hover:text-[var(--brand-teal)] transition-colors leading-tight">
                {{ featuredPost.title }}
              </h3>

              <p class="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                {{ featuredPost.excerpt }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span 
                  v-for="tag in featuredPost.tags" 
                  :key="tag"
                  class="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[var(--bg-overlay)] text-[var(--text-secondary)] border border-[var(--border-muted)]"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>

            <!-- Author & Action -->
            <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-muted)]">
              <div class="flex items-center gap-3">
                <img :src="featuredPost.author.avatar" :alt="featuredPost.author.name" class="w-8 h-8 rounded-full bg-white/10 p-1" />
                <div>
                  <h4 class="text-xs font-bold text-[var(--text-primary)] m-0">{{ featuredPost.author.name }}</h4>
                  <p class="text-[10px] text-[var(--text-muted)] m-0">{{ featuredPost.author.role }}</p>
                </div>
              </div>

              <button 
                class="btn btn-primary btn-sm inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[var(--brand-teal)]/20"
                @click.stop="handleSelectPost(featuredPost)"
              >
                <span>Read Full Article</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Articles Grid -->
      <div v-if="regularPosts.length > 0" class="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        <article 
          v-for="post in regularPosts" 
          :key="post.id"
          class="rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] p-6 md:p-8 flex flex-col justify-between transition-all hover:border-[var(--brand-teal)]/40 hover:shadow-xl hover:shadow-[var(--brand-teal)]/5 cursor-pointer group"
          @click="handleSelectPost(post)"
        >
          <div>
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--brand-teal)]/15 text-[var(--brand-teal)] border border-[var(--brand-teal)]/30">
                {{ post.category }}
              </span>
              <span class="text-xs text-[var(--text-muted)]">
                {{ post.readTime }}
              </span>
            </div>

            <h3 class="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2.5 group-hover:text-[var(--brand-teal)] transition-colors leading-snug">
              {{ post.title }}
            </h3>

            <p class="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>

            <div class="flex flex-wrap gap-1.5 mb-6">
              <span 
                v-for="tag in post.tags.slice(0, 3)" 
                :key="tag"
                class="text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg-overlay)] text-[var(--text-secondary)] border border-[var(--border-muted)]"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-[var(--border-muted)]">
            <span class="text-xs text-[var(--text-muted)] font-medium">
              {{ post.publishDate }}
            </span>

            <span class="text-xs font-bold text-[var(--brand-teal)] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Read Article</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </span>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else-if="!featuredPost && filteredPosts.length === 0" class="text-center py-16 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-muted)]">
        <p class="text-base text-[var(--text-secondary)]">No articles found matching "{{ searchQuery }}"</p>
        <button @click="searchQuery = ''; selectedCategory = 'All'" class="btn btn-outline-purple btn-sm mt-3">Reset Filters</button>
      </div>

    </div>
  </section>
</template>

