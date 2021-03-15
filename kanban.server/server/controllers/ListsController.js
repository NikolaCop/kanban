import BaseController from '../utils/BaseController'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/tasksService'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
      .put('/:id', this.edit)
      .get('/:id/tasks', this.getAllTasksByListId)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await listsService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await listsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await listsService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await listsService.edit(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async getAllTasksByListId(req, res, next) {
    try {
      res.send(await tasksService.find({ list: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
