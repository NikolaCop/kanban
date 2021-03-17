import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class TasksService {
  async find(query = {}) {
    return await dbContext.Task.find(query).populate('creatorId')
  }

  async create(body) {
    return await dbContext.Task.create(body)
  }

  async delete(id, userId) {
    const task = await dbContext.Task.findOneAndRemove({ _id: id, creatorId: userId })
    if (!task) {
      throw new BadRequest('You are NOT my real dad, Jeff')
    }
    return task
  }

  async edit(id, userId, body) {
    const task = await dbContext.Task.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true })
    if (!task) {
      throw new BadRequest('You are NOT my real dad, Jeff')
    }
    return task
  }
}
export const tasksService = new TasksService()
