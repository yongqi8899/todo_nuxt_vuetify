<template>
  <UserSearch />
  <UserContent
    ref="contentRef" @click:add="handleAdd" @click:edit="handleEdit"
  />
  <ClientOnly>
    <UserModal ref="dialog" />
  </ClientOnly>
</template>

<script lang="ts" setup>
const contentRef = ref<any>(null)
const dialog = ref<any>(null)
function handleAdd() {
  dialog.value?.modalShow()
}
function handleEdit(itemData: any) {
  dialog.value?.modalShow(false, itemData)
}
</script>
