<template>
  <div class="create-task-modal">
    <div
      class="modal fade"
      :id="'create-task'+ listData.id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Create a Task
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createTask">
              <div class="form-group">
                <input
                  type="text"
                  name="description"
                  id="description"
                  class="form-control"
                  placeholder="Enter task description..."
                  aria-describedby="helpId"
                  v-model="state.newTask.description"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer justify-content-center">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-success" @click="createTask">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
import { tasksService } from '../services/TasksService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default {
  name: 'CreateTaskModal',
  props: {
    listData: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      board: computed(() => AppState.activeBoard),
      list: computed(() => AppState.lists),
      newTask: {}
    })
    return {
      state,
      async createTask() {
        try {
          state.newTask.list = props.listData.id
          state.newTask.user = state.user
          await tasksService.createTask(state.newTask)
          $('#create-task' + `${props.listData.id}`).modal('hide')

          state.newTask = {}
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
</style>
