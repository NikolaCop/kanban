<template>
  <div class="list col-4">
    <div
      class="card"
      :@drop="onDrop($event, list.id)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="card-header d-flex justify-content-between">
        <h5>{{ list.description }}</h5>
        <i
          type="button"
          id="plusButton"
          data-toggle="modal"
          :data-target="'#create-task' + list.id"
          class="fas fa-plus-circle"
        ></i>
        <i type="button" class="fas fa-minus-circle" @click="deleteList"></i>
      </div>
      <CreateTaskModal :list-data="list" />
      <div class="card-body scroll">
        <i class="fas fa-spinner fa-spin" v-if="state.loading"></i>
        <Task
          v-else
          v-for="task in state.tasks"
          :key="task._id"
          :list="list"
          :task="task"
          draggable="true"
          @dragstart="startDrag($event, task)"
        />
      </div>
    </div>
  </div>
</template>

<script>
// NOTE put ref back into import from vue

import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import { listsService } from '../services/ListsService'
import { useRoute } from 'vue-router'
export default {
  name: 'List',
  props: { list: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      loading: true,
      board: computed(() => AppState.activeBoard),
      tasks: computed(() => AppState.tasks[props.list.id]),
      user: computed(() => AppState.user),
      newTask: {}
    })
    // NOTE figure out how to apply the ref, what data to pass in, and how, and where to apply it
    // const task = ref([state.tasks[props.list.id]])

    onMounted(async () => {
      await tasksService.getTasks(props.list.id)
      state.loading = false
    })
    return {
      state,
      route,
      async deleteList() {
        await listsService.deleteList(props.list.id, route.params.id)
      },
      startDrag(event, task) {
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('itemId', task.id)
      },
      onDrop(event, list) {
        const itemId = event.dataTransfer.getData('itemId')
        const task = tasks.value.find((task) => task.id == itemId)
        task.list = list
      }
    }
  },
  components: {}
}
</script>
<style>
.scroll {
  /* min-height: 1vh; */
  overflow-y: auto;
}
.card {
  height: max-content;
}
#plusButton {
  color: rgb(4, 160, 51);
}
</style>
