<template>
  <div class="comment">
    <h1>{{ comment.description }}</h1>
    <h5>{{ comment.creatorId.email }}</h5>
    <i v-if="state.user.email == comment.creatorId.email" type="button" class="fas fa-times-circle text-danger" @click="deleteComment"></i>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'

export default {
  name: 'Comment',
  props: { comment: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      comments: computed(() => AppState.comments),
      user: computed(() => AppState.user)
    })
    return {
      state,
      async deleteComment() {
        await commentsService.deleteComment(props.comment.id, props.comment.task)
      }
    }
  },
  components: {}
}
</script>
