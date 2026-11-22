import { ref } from 'vue';

export type Theme = 'light' | 'dark';

const savedTheme = typeof localStorage !== 'undefined' ? (localStorage.getItem('fabneon-theme') as Theme | null) : null;
const systemPrefersDark = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : true;
const initialTheme: Theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

const theme = ref<Theme>(initialTheme);

export function useTheme() {
  const applyTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('fabneon-theme', newTheme);
    }
  };

  const toggleTheme = () => {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark');
  };

  // Immediate init
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme.value);
  }

  return {
    theme,
    applyTheme,
    toggleTheme
  };
}
