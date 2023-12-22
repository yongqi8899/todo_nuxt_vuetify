<template id="Registrieren">
  <v-row justify="center">
    <v-col lg="11" sm="8" xl="7">
      <v-card elevation="8" class="m-auto">
        <v-row>
          <v-col lg="12">
            <div class="pa-7">
              <h2 class="font-weight-bold mt-4" align="center">
                Registrieren
              </h2>
              <v-expand-transition>
                <v-alert v-show="errorMsg" type="error">
                  {{ errorMsg }}
                </v-alert>
              </v-expand-transition>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.stop="registerAction"
              >
                <v-text-field
                  v-model="regAccount.username"
                  :rules="rules.username"
                  color="primary"
                  label="Username"
                  variant="underlined"
                />

                <v-text-field
                  v-model="regAccount.email"
                  :rules="rules.email"
                  color="primary"
                  label="Email"
                  variant="underlined"
                />

                <v-text-field
                  v-model="regAccount.password"
                  :rules="rules.password"
                  :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  color="primary"
                  label="Password"
                  variant="underlined"
                  @click:append-inner="show1 = !show1"
                />

                <v-text-field
                  :rules="rules.confirmPassword"
                  :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  color="primary"
                  label="Password wiederholen"
                  variant="underlined"
                  @click:append-inner="show2 = !show2"
                />
                <div class="d-flex align-center mb-4 justify-center">
                  <h6 class="text-subtitle-1 my-7">
                    Haben Sie schon Account?
                  </h6>
                  <v-btn to="login" variant="plain">
                    Login
                  </v-btn>
                </div>
                <v-btn
                  color="primary"
                  block
                  class="py-6"
                  @click.stop="registerAction"
                >
                  Registrieren
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
import { emailRules, passwordRules, usernameRules } from '@/lib/rules'
const loginStore = useLoginStore()
const form = ref<any>()
const show1 = ref(false)
const show2 = ref(false)

const regAccount = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const valid = ref(true)
const validated = ref(false)
const errorMsg = ref()

function checkPasswordEquals(value: string) {
  return regAccount.password === value || 'Bitte geben Sie die richtige Password ein'
}

const rules = {
  username: usernameRules,
  email: emailRules,
  password: passwordRules,
  confirmPassword: [...passwordRules, checkPasswordEquals],
}

async function registerAction() {
  errorMsg.value = ''

  const { valid } = await form?.value.validate()
  if (!valid) {
    errorMsg.value = 'Bitte geben Sie die Info ein'
    return
  }

  try {
    loginStore.register({
      username: regAccount.username,
      email: regAccount.email,
      password: regAccount.password,
      confirmPassword: regAccount.confirmPassword,
    })
    navigateTo('/')
  } catch (err) {
    validated.value = true
    errorMsg.value = err
  }
}
</script>
