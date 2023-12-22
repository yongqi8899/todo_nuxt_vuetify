<template>
  <v-dialog v-model="model" width="500" :persistent="loading">
    <v-card :loading="loading">
      <v-card-title>Confirm Delete?</v-card-title>

      <v-card-text>
        Möchten Sie wirklisch die User {{ user['first name'] }} {{ user['last name'] }}  löschen?
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn :disabled="loading" @click="close">
          No, cancel
        </v-btn>

        <v-btn :disabled="loading" color="red-darken-2" @click="confirm">
          Yes, delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const model = ref(false)
const user = ref<any>(null)

const loading = ref(false)

async function confirm() {
  loading.value = true
  const status = await userStore.deleteUserByIdAction(user._rawValue.id)
  loading.value = false
  userStore.page = 1
  if (status) {
    userStore.getUsersListAction()
  }

  close()
}
function open(data: any) {
  user.value = data
  model.value = true
}
function close() {
  model.value = false
}

defineExpose({
  open,
  close,
})
</script>
