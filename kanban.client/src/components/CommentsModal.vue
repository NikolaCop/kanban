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
            <h2 class="modal-title">
              Comments
            </h2>
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
          <div class="modal-footer justify-content-center" id="modalFooter">
            <form @submit.prevent="createComment">
              <div class="form-group">
                <input
                  type="text"
                  name="description"
                  id="description"
                  class="form-control"
                  placeholder="Enter comment..."
                  aria-describedby="helpId"
                  v-model="state.newComment.description"
                />
              </div>
            </form>
            <button class="btn btn-primary mb-4 ml-2" id="commentButton" @click="createComment">
              <i class="fas fa-comment"></i>
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
          state.newComment.task = props.task
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
#commentButton{
  border-radius: 50px
}
#description{
  border-radius: 50px;
  width: 350px;
}

#modalFooter{
  background-image: url('https://i.pinimg.com/originals/b6/1a/6c/b61a6cf83ad7755c1e377888b1d75943.gif');
  background-size: cover;
}
.modal-header{
  background-image: url('https://ak.picdn.net/shutterstock/videos/1057395205/thumb/11.jpg?ip=x480');
  background-size: cover;
}
.modal-title{
  color: white;
}
.close{
  color: red
}
</style>
