<!-- <template>
  <template v-for="item in searchConfig.formItems" :key="item.prop">
    <v-col
      cols="12"
    >
      <template v-if="item.type === 'input'">
        <v-text-field
          v-model="filters[item.name]"
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
          v-model="filters[item.name]"
          density="compact"
          variant="outlined"
          :items="item.options"
          label="Active"
          class="px-3"
          color="primary"
          hide-details
        />
      </template>
    </v-col>
  </template> -->
  <!-- dynamic Component?
          <template v-for="item in searchConfig.formItems" :key="item.prop">
            <component
              :is="`v-${item.type}`"
              v-model="filters[item.name]"
              density="compact"
              variant="outlined"
              :items="item.options"
              label="Active"
              class="px-3"
              color="primary"
              hide-details
            />
          </template>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const model = ref(false)
const loading = ref(false)

const filters = ref<Record<string, any>>({})

function search() {
  loading.value = true
  userStore.filters = JSON.parse(JSON.stringify(filters.value))
  userStore.page = 1
  userStore.getUsersListAction()
  close()
}
function open() {
  filters.value = JSON.parse(JSON.stringify(userStore.filters))
  model.value = true
}
function close() {
  model.value = false
  loading.value = false
}

defineExpose({
  open,
  close,
})
</script>

