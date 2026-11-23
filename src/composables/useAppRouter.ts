import { ref, computed, nextTick } from 'vue';
import { caseStudies, type CaseStudyData } from '../data/caseStudies';
import { blogPosts, type BlogPost } from '../data/blogPosts';

export type AppPage = 'home' | 'case-studies' | 'terms' | 'privacy' | 'case-study' | 'blog-post';

const SITE_CANONICAL_BASE = 'https://fabneon.com';

const HOME_META_TITLE = 'Fabneon Technologies Limited | Best Software Company in Rajshahi & Bangladesh | Enterprise ERP & AI Solutions';
const HOME_META_DESC = 'Fabneon Technologies Limited is the premier corporate software engineering firm in Rajshahi & Bangladesh. We build scalable enterprise ERPs, cloud SaaS operating systems (RepairSoft, FabPharma), and government-accredited digital ecosystems (Global Knowledge Institute GKITI BTEB 23415).';

export function updateMetaTags(title: string, desc: string, canonicalPath: string) {
  if (typeof document === 'undefined') return;
  document.title = title;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.setAttribute('content', desc);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', desc);

  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const fullCanonical = `${SITE_CANONICAL_BASE}${cleanPath === '/' ? '/' : cleanPath}`;

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', fullCanonical);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', fullCanonical);
}

export function scrollToTarget(targetId: string, smooth = true) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  const el = document.getElementById(targetId);
  if (el) {
    const navOffset = 110;
    const elTop = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: Math.max(0, elTop - navOffset),
      behavior: smooth ? 'smooth' : 'auto'
    });
  }
}

function getInitialRouting() {
  if (typeof window === 'undefined') {
    return { page: 'home' as AppPage, caseStudyId: 'gkiti', blogSlug: 'best-software-company-in-rajshahi' };
  }

  const path = window.location.pathname;
  const hash = window.location.hash;

  // Pathname routing check
  if (path === '/case-studies' || path === '/case-studies/') {
    return { page: 'case-studies' as AppPage, caseStudyId: 'gkiti', blogSlug: 'best-software-company-in-rajshahi' };
  }
  if (path.startsWith('/case-study/')) {
    const id = path.replace('/case-study/', '').replace(/\/$/, '');
    return { page: 'case-study' as AppPage, caseStudyId: id, blogSlug: 'best-software-company-in-rajshahi' };
  }
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '').replace(/\/$/, '');
    return { page: 'blog-post' as AppPage, caseStudyId: 'gkiti', blogSlug: slug };
  }
  if (path === '/terms' || path === '/terms/') {
    return { page: 'terms' as AppPage, caseStudyId: 'gkiti', blogSlug: 'best-software-company-in-rajshahi' };
  }
  if (path === '/privacy' || path === '/privacy/') {
    return { page: 'privacy' as AppPage, caseStudyId: 'gkiti', blogSlug: 'best-software-company-in-rajshahi' };
  }

  // Hash routing fallback check
  if (hash.startsWith('#case-study-')) {
    const id = hash.replace('#case-study-', '');
    return { page: 'case-study' as AppPage, caseStudyId: id, blogSlug: 'best-software-company-in-rajshahi' };
  }
  if (hash.startsWith('#blog-')) {
    const slug = hash.replace('#blog-', '');
    return { page: 'blog-post' as AppPage, caseStudyId: 'gkiti', blogSlug: slug };
  }
  if (hash === '#terms') {
    return { page: 'terms' as AppPage, caseStudyId: 'gkiti', blogSlug: 'best-software-company-in-rajshahi' };
  }
  if (hash === '#privacy') {
    return { page: 'privacy' as AppPage, caseStudyId: 'gkiti', blogSlug: 'best-software-company-in-rajshahi' };
  }

  return { page: 'home' as AppPage, caseStudyId: 'gkiti', blogSlug: 'best-software-company-in-rajshahi' };
}

const initialRoute = getInitialRouting();
const currentPage = ref<AppPage>(initialRoute.page);
const previousPage = ref<AppPage>('home');
const selectedCaseStudyId = ref(initialRoute.caseStudyId);
const selectedBlogPostSlug = ref(initialRoute.blogSlug);

export function useAppRouter() {
  const currentCaseStudy = computed<CaseStudyData>(() =>
    caseStudies.find(c => c.id === selectedCaseStudyId.value) || caseStudies[0]
  );

  const currentBlogPost = computed<BlogPost>(() =>
    blogPosts.find(p => p.slug === selectedBlogPostSlug.value) || blogPosts[0]
  );

  const openCaseStudy = (id: string) => {
    previousPage.value = currentPage.value;
    selectedCaseStudyId.value = id;
    currentPage.value = 'case-study';
    try {
      window.history.pushState(null, '', `/case-study/${id}`);
    } catch (_) {
      window.location.hash = 'case-study-' + id;
    }
    const study = caseStudies.find(c => c.id === id) || caseStudies[0];
    updateMetaTags(
      `${study.title} | Case Study | Fabneon Technologies Limited`,
      study.shortDesc,
      `/case-study/${id}`
    );
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeCaseStudy = () => {
    if (previousPage.value === 'case-studies') {
      navigateTo('case-studies');
      return;
    }
    currentPage.value = 'home';
    try {
      window.history.pushState(null, '', '/#case-studies');
    } catch (_) {
      window.location.hash = 'case-studies';
    }
    updateMetaTags(HOME_META_TITLE, HOME_META_DESC, '/');
    nextTick(() => {
      setTimeout(() => {
        scrollToTarget('case-studies');
      }, 60);
    });
  };

  const openBlogPost = (post: BlogPost) => {
    previousPage.value = currentPage.value;
    selectedBlogPostSlug.value = post.slug;
    currentPage.value = 'blog-post';
    try {
      window.history.pushState(null, '', `/blog/${post.slug}`);
    } catch (_) {
      window.location.hash = 'blog-' + post.slug;
    }
    updateMetaTags(
      `${post.title} | Fabneon Technologies Limited`,
      post.excerpt,
      `/blog/${post.slug}`
    );
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeBlogPost = () => {
    currentPage.value = 'home';
    try {
      window.history.pushState(null, '', '/#blog');
    } catch (_) {
      window.location.hash = 'blog';
    }
    updateMetaTags(HOME_META_TITLE, HOME_META_DESC, '/');
    nextTick(() => {
      setTimeout(() => {
        scrollToTarget('blog');
      }, 60);
    });
  };

  const navigateTo = (page: AppPage) => {
    currentPage.value = page;
    if (page === 'case-studies') {
      try { window.history.pushState(null, '', '/case-studies'); } catch (_) { window.location.hash = 'all-case-studies'; }
      updateMetaTags(
        'Enterprise Case Studies & Architecture Specs | Fabneon Technologies Limited',
        'Explore all enterprise software case studies, cloud SaaS platforms, and digital ecosystems engineered by Fabneon Technologies Limited.',
        '/case-studies'
      );
    } else if (page === 'terms') {
      try { window.history.pushState(null, '', '/terms'); } catch (_) { window.location.hash = 'terms'; }
      updateMetaTags('Terms & Conditions | Fabneon Technologies Limited', 'Terms of service and legal conditions for Fabneon Technologies Limited.', '/terms');
    } else if (page === 'privacy') {
      try { window.history.pushState(null, '', '/privacy'); } catch (_) { window.location.hash = 'privacy'; }
      updateMetaTags('Privacy Policy | Fabneon Technologies Limited', 'Privacy policy and data governance at Fabneon Technologies Limited.', '/privacy');
    } else {
      try { window.history.pushState(null, '', '/'); } catch (_) { window.location.hash = ''; }
      updateMetaTags(HOME_META_TITLE, HOME_META_DESC, '/');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleRoutingSync = () => {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname;
    const hash = window.location.hash;

    // Path-based match
    if (path === '/case-studies' || path === '/case-studies/') {
      currentPage.value = 'case-studies';
      updateMetaTags(
        'Enterprise Case Studies & Architecture Specs | Fabneon Technologies Limited',
        'Explore all enterprise software case studies, cloud SaaS platforms, and digital ecosystems engineered by Fabneon Technologies Limited.',
        '/case-studies'
      );
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    if (path.startsWith('/case-study/')) {
      const id = path.replace('/case-study/', '').replace(/\/$/, '');
      if (caseStudies.some(c => c.id === id)) {
        selectedCaseStudyId.value = id;
        currentPage.value = 'case-study';
        const study = caseStudies.find(c => c.id === id);
        if (study) {
          updateMetaTags(`${study.title} | Case Study | Fabneon Technologies Limited`, study.shortDesc, `/case-study/${id}`);
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
    }
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '').replace(/\/$/, '');
      const found = blogPosts.find(p => p.slug === slug);
      if (found) {
        selectedBlogPostSlug.value = slug;
        currentPage.value = 'blog-post';
        updateMetaTags(`${found.title} | Fabneon Technologies Limited`, found.excerpt, `/blog/${slug}`);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
    }
    if (path === '/terms' || path === '/terms/') {
      currentPage.value = 'terms';
      updateMetaTags('Terms & Conditions | Fabneon Technologies Limited', 'Terms of service and legal conditions for Fabneon Technologies Limited.', '/terms');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    if (path === '/privacy' || path === '/privacy/') {
      currentPage.value = 'privacy';
      updateMetaTags('Privacy Policy | Fabneon Technologies Limited', 'Privacy policy and data governance at Fabneon Technologies Limited.', '/privacy');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // Hash-based fallback match
    if (hash.startsWith('#case-study-')) {
      const id = hash.replace('#case-study-', '');
      if (caseStudies.some(c => c.id === id)) {
        selectedCaseStudyId.value = id;
        currentPage.value = 'case-study';
        return;
      }
    }
    if (hash.startsWith('#blog-')) {
      const slug = hash.replace('#blog-', '');
      const found = blogPosts.find(p => p.slug === slug);
      if (found) {
        selectedBlogPostSlug.value = slug;
        currentPage.value = 'blog-post';
        return;
      }
    }
    if (hash === '#terms') {
      currentPage.value = 'terms';
      return;
    }
    if (hash === '#privacy') {
      currentPage.value = 'privacy';
      return;
    }
    if (hash === '#blog' && currentPage.value === 'blog-post') {
      currentPage.value = 'home';
      nextTick(() => {
        setTimeout(() => {
          scrollToTarget('blog');
        }, 60);
      });
      return;
    }
    if (currentPage.value !== 'home' &&
        !path.startsWith('/case-study/') &&
        !path.startsWith('/blog/') &&
        path !== '/case-studies' &&
        path !== '/case-studies/' &&
        path !== '/terms' &&
        path !== '/privacy' &&
        !hash.startsWith('#case-study-') &&
        !hash.startsWith('#blog-') &&
        hash !== '#terms' &&
        hash !== '#privacy') {
      currentPage.value = 'home';
      updateMetaTags(HOME_META_TITLE, HOME_META_DESC, '/');
    }
  };

  return {
    currentPage,
    selectedCaseStudyId,
    selectedBlogPostSlug,
    currentCaseStudy,
    currentBlogPost,
    openCaseStudy,
    closeCaseStudy,
    openBlogPost,
    closeBlogPost,
    navigateTo,
    handleRoutingSync,
    scrollToTarget
  };
}
