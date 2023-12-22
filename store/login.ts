import type { IAccount, IRegAccount } from '~/types/IAccount'

export const useLoginStore = defineStore('login', {
  state: () => ({
    username: '',
    email: '',
    isLoged: false,
  }),

  actions: {
    getUserByEmail(email: string) {
      const { $storage } = useNuxtApp()
      const users = $storage.getItem('users')
      if (!Array.isArray(users))
        return null
      return users.find(item => item.email === email)
    },

    getUserByCredentials(account: IAccount) {
      const user = this.getUserByEmail(account.email)

      if (user && user.password === account.password)
        return user

      return null
    },

    login(account: IAccount | string) {
      let user = null
      if (typeof account === 'string') {
        user = this.getUserByEmail(account)
      } else {
        user = this.getUserByCredentials(account)
      }

      // If success logged in
      if (user) {
        // Save the email
        useCookie('user').value = user.email

        // Update
        this.$patch({
          username: user?.username,
          email: user?.email,
        })

        // Reset todo
        useTodosStore().$reset()
        useTodosStore().$patch({
          tasks: user?.items ?? [],
        })

        this.isLoged = true
      }

      return user
    },

    logout() {
      useCookie('user').value = null
      this.$reset()
      useTodosStore().$reset()
    },

    register(account: IRegAccount) {
      const user = this.getUserByEmail(account.email)

      if (user)
        throw new Error('Der Bunutzer existiert schon!')

      const { $storage } = useNuxtApp()

      const users = $storage.getItem('users') ?? []

      if (Array.isArray(users)) {
        // Save the user
        users.push({
          username: account.username,
          email: account.email,
          password: account.password,
          items: [],
        })
      }

      $storage.setItem('users', users)

      this.$patch({
        username: account.username,
        email: account.email,
      })

      // Reset todo
      useTodosStore().$reset()

      useCookie('user').value = account.email
      this.isLoged = true
    },

    onSuccessLogin() {
      useTodosStore().$reset()
    },

    onTodosUpdate() {
      if (!this.isLoged)
        return

      const todoStore = useTodosStore()
      const { $storage } = useNuxtApp()

      const users = $storage.getItem('users') ?? []
      const currentUser = users.find((item: any) => item.email === this.email)

      if (currentUser) {
        currentUser.items = Array.isArray(currentUser.items) ? currentUser.items : []
        currentUser.items = JSON.parse(JSON.stringify(todoStore.tasks))
        $storage.setItem('users', users)
      }
    },
  },
})
