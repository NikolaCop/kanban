import { AppState } from '../AppState'
import { api } from './AxiosService'
import { logger } from '../utils/Logger'

class TasksService {
  async createTask(taskData) {
    try {
      await api.post('/api/tasks', taskData)
      this.getTasks(taskData.list)
    } catch (error) {
      logger.log(error)
    }
  }

  async getTasks(listId) {
    try {
      const res = await api.get('api/lists/' + listId + '/tasks')
      AppState.tasks[listId] = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteTask(id, listId) {
    await api.delete(`api/tasks/${id}`)
    this.getTasks(listId)
  }
}

export const tasksService = new TasksService()
