<template>
  <div class="mb-7">
    <TodoPageSearch />
    <TodoPageContent
      ref="contentRef"
      @new-click="handleAddClick"
      @edit-click="handleEditClick"
    />

    <ClientOnly>
      <TodoPageModal ref="dialog" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const contentRef = ref<any>(null)
const dialog = ref<any>(null)

function handleAddClick() {
  dialog.value?.show()
}

function handleEditClick(itemData: any) {
  dialog.value?.show(itemData)
}
</script>
