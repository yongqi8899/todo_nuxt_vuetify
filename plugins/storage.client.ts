export default defineNuxtPlugin(() => {
  const plugin = {
    setItem(key: any, value: any) {
      localStorage.setItem(key, JSON.stringify(value))
    },

    getItem(key: any) {
      try {
        const value = localStorage.getItem(key) || ''
        return JSON.parse(value)
      } catch (e) {}
      return null
    },
    removeItem(key: string) {
      localStorage.removeItem(key)
    },
  }

  return {
    provide: {
      storage: plugin,
    },
  }
})
