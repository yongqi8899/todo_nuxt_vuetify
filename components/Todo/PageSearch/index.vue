<template>
  <div class="searchForm">
    <v-form ref="form" v-model="dialogVisible" class="d-flex align-center">
      <v-text-field
        v-model="todoStore.search"
        density="compact"
        variant="outlined"
        label="Suchen nach Name und Bezeichnung"
        append-inner-icon="mdi-magnify"
        class="px-3"
        color="primary"
        hide-details
        @keyup="todoStore.searchTask"
      />

      <v-btn class="ml-6 mr-3" @click="reset">
        <v-icon>mdi-cached</v-icon>
        Reset
      </v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { useTodosStore } from '~/store/todos'
const todoStore = useTodosStore()

const dialogVisible = ref(false)
function reset() {
  todoStore.search = ''
}
</script>

<style lang="sass">
.searchForm
  margin-top: 20px
</style>
