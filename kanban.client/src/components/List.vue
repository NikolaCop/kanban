<template>
  <div class="list col-4">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <h5>{{ list.description }}</h5>
        <i type="button" data-toggle="modal" :data-target="'#create-task'+ list.id" class="fas fa-plus-circle"></i>
      </div>
      <CreateTaskModal :list-data="list" />
      <div class="card-body">
        <i class="fas fa-spinner fa-spin" v-if="state.loading"></i>
        <Task v-else v-for="task in state.tasks" :key="task._id" :task="task" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
export default {
  name: 'List',
  props: { list: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      loading: true,
      board: computed(() => AppState.activeBoard),
      tasks: computed(() => AppState.tasks[props.list.id]),
      user: computed(() => AppState.user),
      newTask: {}
    })

    onMounted(async() => {
      await tasksService.getTasks(props.list.id)
      state.loading = false
    })
    return {
      state
    }
  },
  components: {}
}
</script>
