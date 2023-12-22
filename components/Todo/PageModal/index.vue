<template>
  <v-dialog v-model="dialog" class="max-width">
    <v-card>
      <v-card-title>{{ formTitle }}</v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-img :src="formData.image" width="100px" />
          <v-text-field v-model="formData.title" label="Title" />
          <v-text-field v-model="formData.description" label="Description" />
          <v-select
            v-model="formData.priority"
            :items="priorityItems"
            label="Priorität"
            required
          />

          <v-checkbox v-model="formData.done" label="status" />

          <v-select
            v-model="formData.category_id"
            :items="categoriesStore.items"
            item-title="title"
            item-value="id"
            label="Kategory"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="close()">
          Schließen
        </v-btn>
        <v-btn @click="confirm()">
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useTodosStore } from '~/store/todos'
import { useCategoriesStore } from '~/store/categories'
const categoriesStore = useCategoriesStore()

const todoStore = useTodosStore()
const dialog = ref(false)
const valid = ref(null)

const editId = ref<string | number | null>(null)

const priorityItems = [1, 2, 3]

const formTitle = computed(() => {
  return editId.value ? 'Edit Todo' : 'Add Todo'
})
const formData = ref<any>(null)

function reset() {
  editId.value = null
  formData.value = todoStore.getDefaultItem()
}

function close() {
  dialog.value = false
}

function show(itemData?: any) {
  reset()

  if (itemData?.id) {
    editId.value = itemData.id
    for (const key in itemData) {
      formData.value[key] = itemData[key]
    }
  }

  dialog.value = true
}

function confirm() {
  if (editId.value) {
    todoStore.editTask(editId.value, formData.value)
  } else {
    todoStore.addTask(formData.value)
  }

  close()
}

defineExpose({
  show,
  close,
})
</script>

<style lang="sass" scoped>
.max-width
  max-width: 700px
</style>
