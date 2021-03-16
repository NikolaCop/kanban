
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BoardsService {
  async getAll() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
    logger.log(AppState.boards)
  }

  async getBoard(id) {
    try {
      const res = await api.get('api/boards/' + id)
      AppState.activeBoard = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async getBoardLists(id) {
    try {
      const res = await api.get('api/boards/' + id + '/lists')
      AppState.lists = res.data
    } catch (error) {
      logger.log(error)
    }
  }
}

export const boardsService = new BoardsService()
