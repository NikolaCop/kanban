import BaseController from '../utils/BaseController'
import { boardsService } from '../services/BoardsService'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
      .put('/:id', this.edit)
      .get('/:id/lists', this.getAllListsByBoardId)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await boardsService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await boardsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await boardsService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await boardsService.edit(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async getAllListsByBoardId(req, res, next) {
    try {
      res.send(await listsService.find({ board: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
