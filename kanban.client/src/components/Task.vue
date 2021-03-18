<template>
  <div class="task text-center">
    <div>
      <h5>{{ task.description }}</h5>
      <i v-if="state.user.email == task.creatorId.email" type="button" class="fas fa-times-circle text-danger" @click="deleteTask"></i>

      <button type="button" class="btn btn-flat btn-sm" data-toggle="modal" :data-target="'#comments'+ task.id">
        See Comments
      </button>
    </div>
    <CommentsModal :task="task.id" :comments="state.comments" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { tasksService } from '../services/TasksService'

export default {
  name: 'Task',
  props: {
    task: { type: Object, required: true },
    list: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      tasks: computed(() => AppState.tasks),
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments[props.task.id]),
      board: computed(() => AppState.activeBoard)

    })

    onMounted(async() => {
      await commentsService.getComments(props.task.id)
    })
    return {
      state,
      async deleteTask() {
        await tasksService.deleteTask(props.task.id, props.list.id)
      }
    }
  },
  components: {}
}
</script>
