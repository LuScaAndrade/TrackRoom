import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Function extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare type: string

  @manyToMany(() => User, {
    pivotTable: 'users_functions',
    localKey: 'id',
    pivotForeignKey: 'function_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
  })
  declare users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
