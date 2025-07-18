import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Song extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare pitch: string | null

  @column()
  declare bpm: number | null

  @column()
  declare singerId: number

  //Permite saber quem é o cantor
  @belongsTo(() => User)
  declare singer: BelongsTo<typeof User>

  //Permite saber quais usuários tem essa música
  @manyToMany(() => User, {
    pivotTable: 'users_songs',
    localKey: 'id',
    pivotForeignKey: 'song_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
  })
  declare users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
