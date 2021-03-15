<template>
  <div class="home-page container">
    <Board v-for="board in state.boards" :key="board.id" :board="board" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
export default {
  name: 'HomePage',
  setup() {
    const state = reactive({
      loading: true,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      boards: computed(() => AppState.boards),
      showForm: false
    })
    onMounted(async() => {
      await boardsService.getAll()
      state.loading = false
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">

</style>
