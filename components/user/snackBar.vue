<template>
  <v-snackbar
    v-model="userStore.snackbar"
    :timeout="2000"
  >
    {{ userStore.snackbarText }}
  </v-snackbar>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
</script>
