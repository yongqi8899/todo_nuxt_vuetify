import { addUser, deleteUserById, editUser, getUserById, getUserList } from '~~/service/user'

interface IUserState {
  filters: Record<string, any>
  search: string
  page: number
  perPage: number
  totalCount: number
  loading: boolean
  items: any[]
  snackbarText: string
  snackbar: boolean
  detailData: Object
}

export const useUserStore = defineStore('user', {
  state: (): IUserState => {
    return {
      filters: {},
      search: '',
      page: 1,
      perPage: 10,
      totalCount: 0,
      loading: false,
      items: [] as any[],
      snackbarText: '',
      snackbar: false,

      detailData: {},
    }
  },
  actions: {
    async getUsersListAction() {
      this.loading = true
      const data: Record<string, any> = {}
      for (const key in this.filters) {
        if (this.filters[key])
          data[key] = this.filters[key]
      }
      const result = await getUserList({
        _limit: this.perPage,
        _page: this.page,
        q: this.search,
        ...data,
      }, {
        onResponse: ({ response }: any) => {
          const count = Number(response.headers.get('x-total-count'))
          this.totalCount = isNaN(count) ? 0 : count
        },
      })
      this.loading = false

      if (Array.isArray(result?._data)) {
        this.items = result?._data
      } else {
        this.items = []
      }
    },

    async deleteUserByIdAction(id: number) {
      const res = await deleteUserById(id)

      const status = res?.status === 200

      if (status) {
        this.snackbar = true
        this.snackbarText = 'Delete erfolgreich'
      } else {
        this.snackbar = true
        this.snackbarText = 'Etwas ist schiefgegangen'
      }

      return status
    },
    async addUserAction(userInfo: any) {
      const res = await addUser(userInfo)
      const status = res?.status === 201

      if (status) {
        this.snackbar = true
        this.snackbarText = 'Add erfolgreich'
      } else {
        this.snackbar = true
        this.snackbarText = 'Etwas ist schiefgegangen'
      }

      return status
    },
    async editUserAction(id: number, userInfo: any) {
      const res = await editUser(id, userInfo)
      const status = res?.status === 200

      if (status) {
        this.snackbar = true
        this.snackbarText = 'Edit erfolgreich'
        this.getUsersListAction()
      } else {
        this.snackbar = true
        this.snackbarText = 'Etwas ist schiefgegangen'
      }

      return status
    },
    async getUserDetailAction(id: number) {
      // this.detailData = getUserById(id)
      try {
        const res = await getUserById(id)
        this.detailData = res._data
      } catch (err) {
        console.error('catched!', err)
      }
      console.log('store', this.detailData)
    },
    handleReset() {
      this.filters = {}
      this.search = ''
      this.getUsersListAction()
    },
  },
})
