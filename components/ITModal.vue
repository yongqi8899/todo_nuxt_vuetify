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
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <v-col
              cols="12"
            >
              <template v-if="item.type === 'input'">
                <v-text-field
                  v-model="userData[item.name]"
                  density="compact"
                  variant="outlined"
                  :label="item.label"
                  class="px-3"
                  color="primary"
                  hide-details
                />
              </template>
              <template v-if="item.type === 'select'">
                <v-select
                  v-model="userData[item.name]"
                  density="compact"
                  variant="outlined"
                  :items="item.options"
                  label="Active"
                  class="px-3"
                  color="primary"
                  hide-details
                />
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName" />
              </template>
            </v-col>
          </template>
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
interface IModalProps {
  modalConfig: {
    header: {
      newTitle: string
      oldTitle: string
    }
    formItems: any[]
  }
}
const props = defineProps<IModalProps>()
const userStore = useUserStore()
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.name] = item.initialValue ?? ''
}
const userData = reactive<any>(initialData)
const isNewRef = ref(true)
const dialog = ref(false)
const editData = ref()
const loading = ref(false)

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
      userData[key] = ''
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
  return editData.value ? props.modalConfig.header.oldTitle : props.modalConfig.header.newTitle
})
defineExpose({ modalShow })
</script>
