<template>
  <div class="list col-4">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <h5>{{ list.description }}</h5>
        <i type="button" id="plusButton" data-toggle="modal" :data-target="'#create-task'+ list.id" class="fas fa-plus-circle"></i>
        <i type="button" class="fas fa-minus-circle" @click="deleteList"></i>
      </div>
      <CreateTaskModal :list-data="list" />
      <div class="card-body scroll">
        <i class="fas fa-spinner fa-spin" v-if="state.loading"></i>
        <Task v-else v-for="task in state.tasks" :key="task._id" :list="list" :task="task" />
      </div>
    </div>
  </div>
</template>

<script>
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

    onMounted(async() => {
      await tasksService.getTasks(props.list.id)
      state.loading = false
    })
    return {
      state,
      route,
      async deleteList() {
        await listsService.deleteList(props.list.id, route.params.id)
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
.card{
  height: max-content;
}
#plusButton{
  color: rgb(4, 160, 51);
}
</style>
