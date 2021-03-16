<template>
  <div class="task text-center">
    <div>
      <h5>{{ task.description }}</h5>
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
export default {
  name: 'Task',
  props: { task: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      tasks: computed(() => AppState.tasks),
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments[props.task.id])

    })

    onMounted(async() => {
      await commentsService.getComments(props.task.id)
    })
    return {
      state
    }
  },
  components: {}
}
</script>
