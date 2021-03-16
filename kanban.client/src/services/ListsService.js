import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ListsService {
  async createList(listData) {
    try {
      const res = await api.post('api/lists', listData)
      AppState.lists.push(res.data)
    } catch (error) {
      logger.log(error)
    }
  }
}
export const listsService = new ListsService()
