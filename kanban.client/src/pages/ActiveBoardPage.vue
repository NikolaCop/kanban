<template>
  <div v-if="state.board.creatorId && state.user" class="activeboardpage container-fluid">
    <div class="row justify-content-center p-3">
      <i v-if="state.user.email == state.board.creatorId.email" type="button" class="fas fa-minus-circle" @click="deleteBoard"></i>
      <h1 id="titleText">
        {{ state.board.title }}
      </h1>
    </div>
    <button
      id="createButton"
      type="button"
      class="btn btn-primary btn-lg"
      data-toggle="modal"
      data-target="#create-list"
    >
      <i class="fas fa-plus"></i>
    </button>
    <CreateListModal />
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
#titleText{
  color: aqua;
}
#createButton{
  border-radius:50px;
}
</style>
