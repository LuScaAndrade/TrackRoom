import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Payment from './payment.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Room from './room.js'
import User from './user.js'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime()
  declare date: DateTime

  @column()
  declare paid: boolean

  @column()
  declare paymentId: number

  @column()
  declare roomId: number

  @belongsTo(() => Payment)
  declare payment: BelongsTo<typeof Payment>

  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @manyToMany(() => User, {
    pivotTable: 'users_reservations',
    localKey: 'id',
    pivotForeignKey: 'reservation_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'users_id',
  })
  declare users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
