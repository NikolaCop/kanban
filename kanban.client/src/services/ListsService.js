import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ListsService {
  async getBoardLists(id) {
    try {
      const res = await api.get('api/boards/' + id + '/lists')
      AppState.lists = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async createList(listData) {
    try {
      const res = await api.post('api/lists', listData)
      AppState.lists.push(res.data)
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteList(id, boardId) {
    await api.delete(`api/lists/${id}`)
    this.getBoardLists(boardId)
  }
}
export const listsService = new ListsService()
