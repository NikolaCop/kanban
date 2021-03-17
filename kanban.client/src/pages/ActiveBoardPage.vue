<template>
  <div class="activeboardpage container-fluid">
    <div class="row">
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
      <i type="button" class="fas fa-minus-circle" @click="deleteBoard"></i>
    </div>
    <div class="row no-wrap">
      <i class="fas fa-spinner fa-spin" v-if="state.loading"></i>
      <List
        v-else
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
import { useRoute, useRouter } from 'vue-router'
import { listsService } from '../services/ListsService'
export default {
  name: 'ActiveBoardPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      loading: true,
      board: computed(() => AppState.activeBoard),
      user: computed(() => AppState.user),
      lists: computed(() => AppState.lists),
      newList: {}
    })
    onMounted(async() => {
      await boardsService.getBoard(route.params.id)
      await listsService.getBoardLists(route.params.id)
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
      },
      async deleteBoard() {
        await boardsService.deleteBoard(route.params.id)
        router.push({ name: 'Home' })
      }
    }
  },
  components: {}
}
</script>

<style scoped>
.no-wrap {
  flex-wrap: nowrap;
  overflow-x: auto;
}
</style>
