import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
export interface Todo {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
  update: Date;
}
export interface TodoState {
  items: Todo[] | undefined[];
}
export interface TodoUpdate {
  title?: string;
  done?: boolean;
}
const state = (): TodoState => ({
  items: [],
});
const getters = {
  getById: (state: TodoState) => (id: string) => {
    return state.items.find((item: Todo) => (item as Todo).id === id);
  },
  getOrderedTodos: (state: TodoState) =>
    [...state.items].sort(
      (a: Todo, b: Todo) => a.createdAt.getTime() - b.createdAt.getTime()
    ),
};
const actions = {
  add(partialTodo: TodoAdd) {
    const todo: Todo = {
      id: uuid(),
      ...partialTodo,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(todo);
  },
  remove(id: string) {
    this.items = this.items.filter((todo) => todo.id !== id);
  },
  update(id: string, update: TodoUpdate) {
    const index = this.items.findIndex((item) => item.id === id);
    this.items[index] = {
      ...this.items[index],
      ...update,
      updatedAt: new Date(),
    };
  },
};
export const useTodoStore = defineStore("todoStore", {
  state,
  getters,
  actions,
});
