<template>
  <div class="searchForm">
    <v-form ref="form" class="d-flex">
      <v-row>
        <v-col
          cols="6"
          sm="8"
        >
          <v-text-field
            v-model="userStore.search"
            density="compact"
            variant="outlined"
            label="Schnellsuchen"
            class="px-3"
            color="primary"
            hide-details
            clearable
          />
        </v-col>
        <v-col
          cols="2"
        >
          <v-btn variant="text" @click="handleMehrSearch">
            mehr
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-chip
            v-for="userFilter, key in userStore.filters"
            :key="key"
            v-model="userStore.filters[key]"
            class="ma-2"
            closable
            @click:close="closeClick(key)"
          >
            {{ key in labels ? labels[key] : key }}: {{ userFilter }}
          </v-chip>

          <v-btn
            v-if="Object.keys(userStore.filters).length"
            class="ml-6 mr-3"
            variant="text"
            icon="mdi-delete"
            @click="allCloseClick"
          />
        </v-col>
      </v-row>
    </v-form>
    <div class=" my-6 text-right">
      <v-btn class="ml-3 mr-3" @click="userStore.handleReset">
        <v-icon>mdi-cached</v-icon>
        Reset
      </v-btn>
      <v-btn class="ml-6 mr-3">
        <v-icon>mdi-magnify</v-icon>
        Suchen
      </v-btn>
    </div>
  </div>

  <ClientOnly>
    <ITDialogSearch ref="ITDialogSearchRef" :search-config="searchConfig" />
  </ClientOnly>
</template>

<script lang="ts" setup>
defineProps<IProps>()
const emit = defineEmits(['click:mehr'])
interface IProps {
  searchConfig: {
    formItems: any[]
  }
}
const userStore = useUserStore()
const ITDialogSearchRef = ref<any>(null)

const labels: Record<string, string> = {
  'id': 'ID',
  'first name': 'Vorname',
  'last name': 'Name',
  'active': 'Active',
}

function closeClick(key: string) {
  delete userStore.filters[key]
  userStore.getUsersListAction()
}

function allCloseClick() {
  userStore.handleReset()
}
const form = ref<any>()
function handleMehrSearch() {
  ITDialogSearchRef.value?.open()
}

watch(() => userStore.search, userStore.getUsersListAction)
</script>

<style lang="sass">
  .searchForm
    margin-top: 20px
</style>
