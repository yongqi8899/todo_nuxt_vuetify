<template>
  <v-dialog v-model="model" width="500" :persistent="loading">
    <v-card :loading="loading">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="filters['first name']"
                density="compact"
                variant="outlined"
                label="Suchen nach First Name"
                class="px-3"
                color="primary"
                hide-details
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="filters['last name']"
                density="compact"
                variant="outlined"
                label="Suchen nach Last Name"
                class="px-3"
                color="primary"
                hide-details
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="filters.id"
                density="compact"
                variant="outlined"
                label="Suchen nach ID"
                class="px-3"
                color="primary"
                hide-details
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-select
                v-model="filters.active"
                density="compact"
                variant="outlined"
                :items="isActive"
                label="Active"
                class="px-3"
                color="primary"
                hide-details
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="loading" color="red-darken-2" @click="search">
          suchen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const model = ref(false)
const loading = ref(false)
const isActive = [
  {
    value: 'true',
    title: 'Ja',
  },
  {
    value: 'false',
    title: 'Nein',
  }]

const filters = ref<Record<string, any>>({})

function search() {
  loading.value = true
  userStore.filters = JSON.parse(JSON.stringify(filters.value))
  userStore.page = 1
  userStore.getUsersListAction()
  close()
}
function open() {
  filters.value = JSON.parse(JSON.stringify(userStore.filters))
  model.value = true
}
function close() {
  model.value = false
  loading.value = false
}

defineExpose({
  open,
  close,
})
</script>
