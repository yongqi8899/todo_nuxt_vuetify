<template>
  <ITSearch :search-config="searchConfig" />
  <UserContent
    ref="contentRef" @click:add="handleAdd" @click:edit="handleEdit"
  />
  <ClientOnly>
    <ITModal ref="dialog" :modal-config="modalConfig " />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { searchConfig } from '~~/components/userIT/config/search.config'
import { modalConfig } from '~~/components/userIT/config/modal.config'
const contentRef = ref<any>(null)
const dialog = ref<any>(null)
function handleAdd() {
  dialog.value?.modalShow()
}
function handleEdit(itemData: any) {
  dialog.value?.modalShow(false, itemData)
}
</script>
