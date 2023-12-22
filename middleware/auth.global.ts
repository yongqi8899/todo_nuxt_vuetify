export default defineNuxtRouteMiddleware((to) => {
  const user = useCookie('user')

  if (to.path === '/') {
    if (!user.value)
      return navigateTo('/login')
  } else if (['/login', '/register'].includes(to.path)) {
    if (user.value)
      return navigateTo('/')
  }
})
