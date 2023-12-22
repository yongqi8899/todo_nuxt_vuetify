<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container>
        <ITBread />
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
onMounted(() => {
  // Trying to auto log-in
  useLoginStore().login(useCookie('user').value || '')

  // Listen to todo-store mutations
  useTodosStore().$subscribe((mutation, state) => {
    if (mutation.type !== 'direct')
      return

    useLoginStore().onTodosUpdate()
  })
})
</script>
