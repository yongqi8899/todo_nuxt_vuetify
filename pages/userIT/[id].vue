<template>
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
                v-model="data['first name']"
                label="first name"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="data['last name']"
                label="last name"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                v-model="data.active"
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

const loading = ref(false)
const data = ref<any>(null)

const userData = reactive<any>({
  'first name': '',
  'last name': '',
  'active': '',
})

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
function userName() {
  return `${data.value['first name']} ${data.value['last name']}`
}
async function getData() {
  try {
    loading.value = true
    const res = await getUserById(Number(route.params.id))
    data.value = res._data
    for (const key in userData) {
      userData[key] = data[key]
    }
  } catch (err) {
    console.error('catched!', err)
  } finally {
    loading.value = false
  }
}
getData()

async function confirm() {
  const status: any = await userStore.editUserAction(Number(route.params.id), userData)
  if (status) {
    userStore.getUsersListAction()
  }
  navigateTo('/user')
}
</script>
