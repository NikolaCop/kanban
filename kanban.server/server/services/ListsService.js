import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class ListsService {
  async find(query = {}) {
    return await dbContext.List.find(query).populate('board', 'title creatorId')
  }

  async create(body) {
    return await dbContext.List.create(body)
  }

  async delete(id, userId) {
    const list = await dbContext.List.findOneAndRemove({ _id: id, creatorId: userId })
    if (!list) {
      throw new BadRequest('You are NOT my real dad, Jeff')
    }
    return list
  }

  async edit(id, userId, body) {
    const list = await dbContext.List.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true })
    if (!list) {
      throw new BadRequest('You are NOT my real dad, Jeff')
    }
    return list
  }
}
export const listsService = new ListsService()
