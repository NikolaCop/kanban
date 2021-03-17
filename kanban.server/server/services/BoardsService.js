import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class BoardsService {
  async find(query = {}) {
    return await dbContext.Board.find(query).populate('creatorId')
  }

  async findById(id) {
    const board = await dbContext.Board.findById(id)
    if (!board) {
      throw new BadRequest('Invalid ID')
    }
    return board
  }

  async create(body) {
    return await dbContext.Board.create(body)
  }

  async delete(id, userId) {
    const board = await dbContext.Board.findOneAndRemove({ _id: id, creatorId: userId })
    if (!board) {
      throw new BadRequest('You are NOT my real dad, Jeff')
    }
    return board
  }

  async edit(id, userId, body) {
    const board = await dbContext.Board.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true })
    if (!board) {
      throw new BadRequest('You are NOT my real dad, Jeff')
    }
    return board
  }
}
export const boardsService = new BoardsService()
