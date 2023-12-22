<template>
  <v-breadcrumbs
    :items="items"
    divider="/ "
  />
  <pre v-if="loading">Lade data...</pre>
  <template v-else>
    <v-card>
      <v-container>
        <v-card-title>
          <v-row>
            <v-col
              cols="12"
              sm="12"
            >
              <h4>{{ userName }}</h4>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              ID: {{ data.id }}
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-checkbox
                v-model="data.active"
                label="Active"
                readonly
              />
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="userData['first name']"
                label="first name"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="userData['last name']"
                label="last name"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                v-model="userData.active"
                :items="acitveSelectItems"
                item-title="title"
                item-value="value"
                label="Active"
              />
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="confirm()"
            >
              Speichern
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-container>
    </v-card>
  </template>
</template>

<script setup lang="ts">
import { getUserById } from '~~/service/user'

const userStore = useUserStore()
const route = useRoute()
const data = ref<any>()
const userData = ref<Record<string, any>>({})
const updateData = ref<any>()
const loading = ref(false)
const acitveSelectItems = [
  {
    value: true,
    title: 'Ja',
  },
  {
    value: false,
    title: 'Nein',
  },
]

const userName = computed(() => `${data.value['first name']} ${data.value['last name']}`)
async function getData() {
  try {
    loading.value = true
    const res = await getUserById(Number(route.params.id))
    data.value = res._data
    userData.value = JSON.parse(JSON.stringify(data.value))
  } catch (err) {
    console.error('catched!', err)
  } finally {
    loading.value = false
  }
}

getData()

async function confirm() {
  updateData.value = JSON.parse(JSON.stringify(userData.value))
  const status: any = await userStore.editUserAction(Number(route.params.id), updateData)
  if (status) {
    userStore.getUsersListAction()
  }
  navigateTo('/user')
}

const items = computed(() => {
  const items: any[] = [
    {
      title: 'Todo',
      to: '/',
    },
    {
      title: 'User',
      to: '/user',
    },
  ]

  if (data.value) {
    items.push({
      title: `${data.value['first name']} ${data.value['last name']}`,
      to: `/user/${data.value.id}`,
    })
  }

  return items
})
</script>
