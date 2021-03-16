<template>
  <div class="create-list-modal">
    <div
      class="modal fade"
      id="create-list"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Create a List
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
            <form @submit.prevent="createList">
              <div class="form-group">
                <input
                  type="text"
                  name="description"
                  id="description"
                  class="form-control"
                  placeholder="Enter list description..."
                  aria-describedby="helpId"
                  v-model="state.newList.description"
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
            <button class="btn btn-success" @click="createList">
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
import { listsService } from '../services/ListsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default {
  name: 'CreateListModal',
  setup() {
    const state = reactive({
      board: computed(() => AppState.activeBoard),
      newList: {}
    })
    return {
      state,
      async createList() {
        try {
          $('#create-list').modal('hide')

          state.newList.board = state.board
          state.newList.user = state.user
          await listsService.createList(state.newList)

          state.newList = {}
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
