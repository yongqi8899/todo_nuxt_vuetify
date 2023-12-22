<template>
  <v-dialog v-model="model" width="500">
    <slot />
  </v-dialog>
</template>

<script lang="ts" setup>
const model = ref(false)

function open() {
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

