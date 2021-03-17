
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BoardsService {
  async getAll() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
    logger.log(AppState.boards)
  }

  async createBoard(boardData) {
    try {
      const res = await api.post('api/boards', boardData)
      AppState.boards.push(res.data)
      return res.data.id
    } catch (error) {
      logger.log(error)
    }
  }

  async getBoard(id) {
    try {
      const res = await api.get('api/boards/' + id)
      AppState.activeBoard = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteBoard(id) {
    await api.delete(`api/boards/${id}`)
  }
}

export const boardsService = new BoardsService()
