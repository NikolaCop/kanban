<template>
  <div class="board col-3">
    <div class="card" style="width: 18rem;">
      <div class="box">
        <div class="row text-center">
          <div class="col-12">
            <h3> <b>{{ board.title }}</b> </h3>
          </div>
          <div class="col-12 mt-5">
            <router-link :to="{name: 'ActiveBoardPage', params: { id: board.id }}">
              <button>Go to board page</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
// import { boardsService } from '../services/BoardsService'
export default {
  name: 'Board',
  props: {
    board: { type: Object, required: true }
  },
  // add props to setup argument
  setup() {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state
    }
  }

}
</script>

<style>
.card {
  position: relative;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  margin: 30px;
  min-width: 320px;
  height: 320px;
}
.box {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border: 2px solid;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}
.box:hover {
  transform: rotateX(21deg);
  transform-origin: top;
  box-shadow: 0 40px 70px rgba(0, 0, 0, 0.5);
}

</style>
