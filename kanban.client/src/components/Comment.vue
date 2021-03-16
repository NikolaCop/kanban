<template>
  <div class="comment">
    <h1>{{ comment.description }}</h1>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Comment',
  props: { comment: { type: Object, required: true } },
  setup() {
    const state = reactive({
      comments: computed(() => AppState.comments),
      user: computed(() => AppState.user)
    })
    return {
      state
    }
  },
  components: {}
}
</script>
