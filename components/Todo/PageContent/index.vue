<template>
  <div class="py-3">
    <v-text-field
      v-model="todoStore.newTaskTitle"
      color="primary"
      class="pa-3"
      append-inner-icon="mdi-plus"
      density="compact"
      label="Add Todo"
      hide-details
      variant="outlined"
      clearable
      @click:append-inner="handleNewClick"
      @keyup.enter="handleNewClick"
    />
  </div>
  <template v-if="todoStore.tasks.length">
    <v-btn-toggle v-model="toggle" mandatory>
      <v-btn icon="mdi-view-grid-outline" value="one" variant="plain" />
      <v-btn icon="mdi-view-headline" value="two" variant="plain" />
    </v-btn-toggle>
    <v-card v-if="toggle === 'one'" flat>
      <v-card-text>
        <v-row justify="center" value="one" class="pa-3">
          <v-col
            v-for="(task, index) in todoStore.filteredList"
            :key="task.id"
            justify="center"
            cols="12"
            md="6"
            lg="4"
            :class="{ transformScale: index === currentIndex }"
            @mousemove="rowClick(index)"
          >
            <v-card class="mx-auto" max-width="344">
              <v-img :src="task.image" height="200px" cover />
              <v-card-title>{{ task.title }}</v-card-title>

              <v-card-subtitle> {{ formatDate(task.created) }}</v-card-subtitle>

              <v-card-text class="d-flex justify-space-between">
                <div>{{ task.description }}</div>
                <div>
                  {{ categoriesStore.getById(task.category_id)?.title }}
                </div>
              </v-card-text>

              <v-card-actions>
                <v-checkbox
                  v-model="task.done"
                  :color="task.done ? 'success' : ''"
                  label="Erledigt"
                  inline
                  hide-details
                  @click="todoStore.doneTask(task.id)"
                />
                <div>
                  <v-btn
                    small
                    icon="mdi-pencil"
                    class="text-primary"
                    @click="handleEditClick(task)"
                  />

                  <v-btn
                    small
                    icon="mdi-delete"
                    class="text-error"
                    @click="todoStore.deleteTask(task.id)"
                  />
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-if="toggle === 'two'" flat>
      <v-card-text>
        <v-table value="two">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Todos</th>
              <th>Detail</th>
              <th>Erstellungsdatum</th>
              <th>Status</th>
              <th>Kategorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(task, index) in todoStore.filteredList"
              :key="task.id"
              :class="{ active: index === currentIndex }"
              @mouseover="rowClick(index)"
            >
              <td>
                <div class="d-flex align-center py-4">
                  <v-img :src="task.image" width="45px" />
                </div>
              </td>
              <td>{{ task.title }}</td>
              <td>{{ task.description }}</td>
              <td>{{ formatDate(task.created) }}</td>
              <td>
                <v-checkbox
                  v-model="task.done"
                  :color="task.done ? 'success' : ''"
                  inline
                  hide-details
                  @click="todoStore.doneTask(task.id)"
                />
              </td>
              <td>
                {{ categoriesStore.getById(task.category_id)?.title }}
              </td>
              <td>
                <v-icon
                  small
                  icon="mdi-pencil"
                  class="text-primary mr-1"
                  @click="handleEditClick(task)"
                />

                <v-icon
                  small
                  icon="mdi-delete"
                  class="text-error"
                  @click="todoStore.deleteTask(task.id)"
                />
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </template>
  <div v-else class="noTasks">
    <TodoNoTask />
  </div>
</template>

<script lang="ts" setup>
import { useTodosStore } from '~/store/todos'
import { useCategoriesStore } from '~/store/categories'
import formatDate from '~/utils/dateFormat'

const emit = defineEmits(['editClick', 'newClick'])
const todoStore = useTodosStore()
const categoriesStore = useCategoriesStore()
const toggle = ref('one')
const currentIndex = ref(-1)

function rowClick(index: number) {
  currentIndex.value = index
}

function handleEditClick(itemData: any) {
  emit('editClick', itemData)
}
function handleNewClick() {
  emit('newClick')
  todoStore.newTaskTitle = ''
}
</script>

<style lang="sass" scoped>
.noTasks
  position: absolute
  left: 50%
  top: 350px
  transform: translate(-50%,-50%)
  opacity: 0.5
.active
  background-color: rgba(0, 188, 212, 0.1)
.transformScale
  transform: scale(1.05)
</style>
