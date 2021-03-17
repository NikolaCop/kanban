<template>
  <div class="create-board-modal">
    <div
      class="modal fade"
      id="create-board"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Create a Board
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
            <form @submit.prevent="createBoard">
              <div class="form-group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control"
                  placeholder="Enter board title..."
                  aria-describedby="helpId"
                  v-model="state.newBoard.title"
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
            <button class="btn btn-success" @click="createBoard">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { boardsService } from '../services/BoardsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { useRouter } from 'vue-router'
export default {
  name: 'CreateBoardModal',
  setup() {
    const router = useRouter()
    const state = reactive({
      newBoard: {}
    })
    return {
      state,
      async createBoard() {
        try {
          const boardId = await boardsService.createBoard(state.newBoard)
          $('#create-board').modal('hide')
          state.newBoard.user = state.user
          router.push({ name: 'ActiveBoardPage', params: { id: boardId } })
          state.newBoard = {}
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
