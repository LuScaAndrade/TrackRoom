import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const allUsers = User.all()

      if ((await allUsers).length == 0) {
        return response.internalServerError(`Don't exists any registered users`)
      }

      return response.ok(allUsers)
    } catch (error) {
      console.log(error)
      logger.error(error)
      return response.internalServerError(error)
    }
  }

  /**
   * Display form to create a new record
   */
  // async create({}: HttpContext) {}

  // /**
  //  * Handle form submission for the create action
  //  */
  // async store({ request }: HttpContext) {}

  // /**
  //  * Show individual record
  //  */
  // async show({ params }: HttpContext) {}

  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request }: HttpContext) {}

  // /**
  //  * Delete record
  //  */
  // async destroy({ params }: HttpContext) {}
}
