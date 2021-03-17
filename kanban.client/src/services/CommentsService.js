import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
class CommentsService {
  async createComment(commentData) {
    try {
      await api.post('/api/comments', commentData)
      this.getComments(commentData.task)
    } catch (error) {
      logger.log(error)
    }
  }

  async getComments(taskId) {
    try {
      const res = await api.get('api/tasks/' + taskId + '/comments')
      AppState.comments[taskId] = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteComment(id, taskId) {
    await api.delete(`api/comments/${id}`)
    const comInd = AppState.comments[taskId].findIndex(c => c.id === id)
    AppState.comments[taskId].splice(comInd, 1)
  }
}

export const commentsService = new CommentsService()
