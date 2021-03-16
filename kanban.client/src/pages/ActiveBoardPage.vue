<template>
  <div class="activeboardpage">
    <button
      type="button"
      class="btn btn-primary btn-lg"
      data-toggle="modal"
      data-target="#create-list"
    >
      Create A List
    </button>
    <CreateListModal />
    <h1 class="text-center">
      {{ state.board.title }}
    </h1>
    <div class="row">
      <i class="fas fa-spinner fa-spin" v-if="state.loading"></i>
      <List
        v-for="list in state.lists"
        :key="list._id"
        :list="list"
      />
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, onMounted, reactive } from 'vue'
import { boardsService } from '../services/BoardsService'
import { useRoute } from 'vue-router'
import { listsService } from '../services/ListsService'
export default {
  name: 'ActiveBoardPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      board: computed(() => AppState.activeBoard),
      user: computed(() => AppState.user),
      lists: computed(() => AppState.lists),
      newList: {}
    })
    onMounted(async() => {
      await boardsService.getBoard(route.params.id)
      await boardsService.getBoardLists(route.params.id)
      state.loading = false
    })
    return {
      state,
      route,
      async createList() {
        state.newList.board = state.board
        state.newList.user = state.user
        await listsService.createList(state.newList)
        state.newList = {}
      }
    }
  },
  components: {}
}
</script>
