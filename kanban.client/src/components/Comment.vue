<template>
  <div class="comment">
    <div class="row">
      <div class="col-10">
        <h4><b>{{ comment.description }}</b></h4>
      </div>
      <div class="col-2">
        <i v-if="state.user.email == comment.creatorId.email" type="button" class="fas fa-times-circle text-danger mt-2 ml-4" @click="deleteComment"></i>
      </div>
    </div>
    <div class="row ml-1">
      <p><i>{{ comment.creatorId.email }}</i></p>
    </div>
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
