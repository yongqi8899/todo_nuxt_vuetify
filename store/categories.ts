import type { ICategories } from '~/types/ICategories'
interface State {
  items: ICategories[]
}
export const useCategoriesStore = defineStore('category_id', {
  state: (): State => ({
    items: [
      { id: 1, title: 'arbeit' },
      { id: 2, title: 'private' },
    ],
  }),
  getters: {
    getById(state) {
      return (id: number | string) => state.items.find(item => item.id === id)
    },
  },
})
