<template>
  <div class="comments-modal">
    <div
      class="modal fade"
      :id="'comments' + task"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Comments
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
            <i class="fas fa-spinner fa-spin" v-if="state.loading"></i>
            <Comment v-else v-for="comment in comments" :key="comment._id" :comment="comment" />
          </div>
          <div class="modal-footer justify-content-center">
            <form @submit.prevent="createComment">
              <div class="form-group">
                <input
                  type="text"
                  name="description"
                  id="description"
                  class="form-control"
                  placeholder="Enter comment description..."
                  aria-describedby="helpId"
                  v-model="state.newComment.description"
                />
              </div>
            </form>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-success" @click="createComment">
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
import { reactive, computed, onMounted } from 'vue'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default {
  name: 'CommentsModal',
  props: {
    task: { type: String, required: true },
    comments: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      loading: true,
      board: computed(() => AppState.activeBoard),
      comments: computed(() => AppState.comments),
      newComment: {}
    })
    onMounted(async() => {
      state.loading = false
    })
    return {
      state,
      // async getComments() {
      //   commentsService.getCommentsByTaskId(props.task.id)
      // },

      async createComment() {
        try {
          $('#create-comment').modal('hide')

          state.newComment.board = state.board
          state.newComment.user = state.user
          await commentsService.createComment(state.newComment)

          state.newComment = {}
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
