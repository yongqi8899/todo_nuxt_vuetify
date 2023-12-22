import { v4 as uuidv4 } from 'uuid'
import type { ITodos } from '~/types/ITodos'

interface State {
  tasks: ITodos[]
  search: string
  newTaskTitle: string
}

export const useTodosStore = defineStore('todos', {
  state: (): State => ({
    tasks: [],
    newTaskTitle: '',
    search: '',
  }),

  actions: {
    getDefaultItem(): ITodos {
      return {
        id: uuidv4(),
        title: this.newTaskTitle,
        description: '',
        priority: 1,
        created: new Date(),
        done: false,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        category_id: null,
      }
    },

    doneTask(id: number | string) {
      const task = this.tasks.filter((task: any) => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(id: number | string) {
      this.tasks = this.tasks.filter((task: any) => task.id !== id)
    },
    addTask(newTask: ITodos) {
      this.tasks.push(newTask)
    },
    editTask(id: string | number, item: any) {
      const index = this.tasks.findIndex((x: any) => x.id === item.id)
      this.tasks.splice(index, 1, item)
    },
  },
  getters: {
    filteredList(): any {
      return this.tasks.filter(
        (task: any) =>
          (task?.title
            && task?.title.toLowerCase().includes(this.search.toLowerCase()))
          || (task?.description
            && task?.description.toLowerCase().includes(this.search.toLowerCase())),
      )
    },
  },
})
