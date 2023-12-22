<template>
  <div class="searchForm">
    <v-form ref="form" class="d-flex">
      <v-row>
        search
      </v-row>
    </v-form>
    <div class=" my-6 text-right">
      <v-btn class="ml-3 mr-3">
        <v-icon>mdi-cached</v-icon>
        Reset
      </v-btn>
      <v-btn class="ml-6 mr-3">
        <v-icon>mdi-magnify</v-icon>
        Suchen
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  searchConfig: {

  }
}
const props = defineProps<IProps>()
const userStore = useUserStore()
const form = ref<any>()
const isActive = ['true', 'false']
watch(() => userStore.search, userStore.getUsersListAction)
</script>

<style lang="sass">
  .searchForm
    margin-top: 20px
</style>

