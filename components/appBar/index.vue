<template>
  <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
  >
    <template #image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      />
    </template>

    <v-app-bar-title>Todo</v-app-bar-title>

    <v-spacer />
    <template v-if="(loginStore.isLoged === false)">
      <v-btn to="/register">
        Registrieren
      </v-btn>

      <v-btn to="/login">
        Login
      </v-btn>
    </template>
    <template v-else>
      <v-btn flat>
        <v-icon class="mr-2">
          mdi-account
        </v-icon>
        {{ loginStore.username }}
      </v-btn>
      <v-btn @click="logout">
        Logout
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
const loginStore = useLoginStore()

function logout() {
  useLoginStore().logout()
  navigateTo('/login')
}
</script>
