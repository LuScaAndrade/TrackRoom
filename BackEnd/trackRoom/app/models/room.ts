import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Reservation from './reservation.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare is_rented: boolean

  @column()
  declare size: string

  @hasOne(() => Reservation)
  declare reservation: HasOne<typeof Reservation>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
