<template id="login">
  <v-row justify="center" align="center">
    <v-col lg="11" sm="8">
      <v-card elevation="8" class="m-auto">
        <v-row>
          <v-col lg="12">
            <div class="pa-7">
              <h2 class="font-weight-bold mt-4" align="center">
                Login
              </h2>

              <v-expand-transition>
                <v-alert v-show="validated && errorMsg" type="error">
                  {{ errorMsg }}
                </v-alert>
              </v-expand-transition>

              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.stop="loginAction"
              >
                <v-text-field
                  v-model="account.email"
                  :rules="emailR"
                  color="primary"
                  label="E-mail"
                  class="mt-4"
                  required
                  variant="underlined"
                />
                <v-text-field
                  v-model="account.password"
                  :rules="passwordR"
                  color="primary"
                  label="Password"
                  required
                  variant="underlined"
                  :type="show1 ? 'text' : 'password'"
                  :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="show1 = !show1"
                />
                <div class="d-flex align-center mb-6 flex-wrap">
                  <v-btn
                    variant="plain"
                  >
                    Password vergessen
                  </v-btn>
                </div>

                <v-divider />

                <div class="d-flex align-center my-6 justify-center">
                  <h6 class="text-subtitle-1">
                    Keine Account?
                  </h6>
                  <v-btn to="register" variant="plain">
                    Registrieren
                  </v-btn>
                </div>
                <v-btn color="primary" block class="py-6" @click="loginAction">
                  Login
                </v-btn>
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { IAccount } from '~/types/IAccount'
import { emailRules, passwordRules } from '@/lib/rules'

const loginStore = useLoginStore()
const show1 = ref(false)

const validated = ref(false)
const valid = ref(true)
const form = ref<any>()
const account = reactive<IAccount>({
  username: '',
  email: '',
  password: '',
  items: [],
})
const passwordR = passwordRules
const emailR = emailRules

const errorMsg = ref('')

async function loginAction() {
  errorMsg.value = ''

  const { valid } = await form.value?.validate()
  validated.value = true

  if (!valid) {
    errorMsg.value = 'Bitte geben Sie die richtige Email und Password'
    return
  }

  const loggedIn = loginStore.login(account)

  if (!loggedIn) {
    errorMsg.value = 'Dieser Benutzer ist nicht existiert'
    return
  }

  navigateTo('/')
}
</script>
