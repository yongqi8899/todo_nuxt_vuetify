<template>
  <v-dialog
    v-model="dialog"
    :persistent="loading"
    max-width="600px"
  >
    <v-card :loading="loading">
      <v-card-title>
        <span class="text-h5">{{ modalTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="userData['first name']"
                label="first name"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="userData['last name']"
                label="last name"
                persistent-hint
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                v-model="userData.active"
                :items="acitveSelectItems"
                item-title="title"
                item-value="value"
                label="Active"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="loading"
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Schließen
        </v-btn>
        <v-btn
          :disabled="loading"
          color="blue darken-1"
          text
          @click="confirm()"
        >
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const userData = reactive<any>({
  'first name': '',
  'last name': '',
  'active': '',
})
const isNewRef = ref(true)
const dialog = ref(false)
const editData = ref()
const loading = ref(false)

const acitveSelectItems = [
  {
    value: true,
    title: 'Ja',
  },
  {
    value: false,
    title: 'Nein',
  },
]

function modalShow(isNew = true, itemData?: any) {
  dialog.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    for (const key in userData) {
      userData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in userData) {
      userData[key] = ' '
    }
    editData.value = null
  }
}

async function confirm() {
  dialog.value = false
  loading.value = true
  if (!isNewRef.value && editData.value) {
    const status: any = await userStore.editUserAction(editData.value.id, userData)
    loading.value = false
    if (status) {
      userStore.getUsersListAction()
    }
  } else {
    const status: any = await userStore.addUserAction(userData)
    loading.value = false
    if (status) {
      userStore.getUsersListAction()
    }
  }
}

const modalTitle = computed(() => {
  return editData.value ? 'Edit Todo' : 'Add Todo'
})
defineExpose({ modalShow })
</script>
