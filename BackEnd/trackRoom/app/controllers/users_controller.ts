import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const allUsers = await User.all()

      if (allUsers.length == 0) {
        return response.internalServerError(`Don't exists any registered users`)
      }

      return response.status(200).json({ message: `Usuários: ${allUsers}` })
    } catch (error) {
      logger.error(error)
      return response.internalServerError(error.message)
    }
  }

  // /**
  //  * Handle form submission for the create action
  //  */
  // async store({ request }: HttpContext) {}

  // /**
  //  * Show individual record
  //  */
  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)

      return response.status(200).json({ message: `Usuário: ${user}` })
    } catch (error) {
      logger.error(error)
      return response.internalServerError(error.message)
    }
  }

  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request, response }: HttpContext) {
  //   try {
  //     const

  //   } catch (error) {

  //   }
  // }

  // /**
  //  * Delete record
  //  */
  async destroy({ response, params }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      await user.save()

      return response.status(200).json({ message: `Usuário ${user.id} excluído com sucesso!` })
    } catch (error) {}
  }
}
