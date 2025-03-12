import { ref } from 'vue'
const isDark = ref(false)
export const useTheme = () => {
  const toggleTheme = () => {
    const html = document.documentElement
    const logo: any =
      document.getElementsByClassName('plangotrip-logo')?.[0] || null
    if (isDark.value) {
      html.classList.add('plangotrip-app-dark')
      if (logo) logo.src = '/src/assets/images/dark-logo.png'
    } else {
      html.classList.remove('plangotrip-app-dark')
      if (logo) logo.src = '/src/assets/images/logo.png'
    }
  }

  return {
    isDark,
    toggleTheme,
  }
}
