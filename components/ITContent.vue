<template>
  <v-row>
    <v-col
      cols="6"
    >
      <div class="ml-4">
        Ergebnisse: {{ totalCount }}
      </div>
    </v-col>
    <v-col
      cols="6"
      class="d-flex"
    >
      <ClientOnly>
        <v-select
          v-model="perPage"
          class="mr-4"
          :items="perPageOptions"
          :menu-props="{ maxWidth: '50', maxHeight: '600' }"
          variant="underlined"
          color="primary"
          label="Items per Page"
        />
      </ClientOnly>
      <v-btn class="ml-10" @click="handleNewUserClick">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
  </v-row>
  <v-card flat>
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody v-if="loading">
          <tr colspan="4">
            <td>Loading...</td>
          </tr>
        </tbody>
        <tbody v-else-if="Array.isArray(items) && items.length">
          <tr
            v-for="user in items"
            :key="user.id"
          >
            <td>{{ user.id }}</td>
            <td>{{ user["first name"] }}</td>
            <td>{{ user["last name"] }}</td>
            <td>
              <v-checkbox
                v-model="user.active"
                inline
                hide-details
                readonly
              />
            </td>
            <td>
              <v-btn
                size="small"
                icon="mdi-eye"
                variant="text"
                class="text-info mr-1"
                :to="`/user/${user.id}`"
              />
              <v-btn
                size="small"
                icon="mdi-pencil"
                variant="text"
                class="text-primary mr-1"
                @click="handleEditBtnClick(user)"
              />
              <v-btn
                size="small"
                icon="mdi-delete"
                variant="text"
                class="text-error"
                @click="handleDeleteBtnClick(user)"
              />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
  <div class="text-center">
    <v-container>
      <v-pagination
        v-model="page"
        class="my-4"
        :length="pageCount"
      />
    </v-container>
  </div>
  <ClientOnly>
    <user-dialog-delete ref="dialogDelete" />
    <UserSnackBar />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

interface IProps {
  contentConfig: {
    dataList: any[]
  }
}
const emit = defineEmits(['click:add', 'click:edit'])
const userStore = useUserStore()
const { items, totalCount, loading, page, perPage } = storeToRefs(userStore)
const perPageOptions = ref([10, 20, 30])
interface Dialog {
  open(data: any): void
  close(): void
}
const dialogDelete = ref<Dialog>()

watch(page, fetchUser)
watch(perPage, () => {
  page.value = 1
  fetchUser()
})

const pageCount = computed(() => Math.ceil(totalCount.value / perPage.value))
fetchUser()

function fetchUser() {
  userStore.getUsersListAction()
}
function handleDeleteBtnClick(user: any) {
  dialogDelete.value?.open(user)
}
function handleNewUserClick() {
  emit('click:add')
}
function handleEditBtnClick(itemData: any) {
  emit('click:edit', itemData)
}

defineExpose({ fetchUser })
</script>

