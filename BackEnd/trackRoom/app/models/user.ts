import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Song from './song.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from './role.js'
import Function from './function.js'
import Reservation from './reservation.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  //Permite saber quais músicas o usuário canta
  @hasMany(() => Song)
  public songs!: HasMany<typeof Song>

  //Permite saber quais músicas o usuário está associado
  @manyToMany(() => Song, {
    pivotTable: 'users_songs',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'song_id',
  })
  declare userSongs: ManyToMany<typeof Song>

  @manyToMany(() => Role, {
    pivotTable: 'users_roles',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
  })
  declare roles: ManyToMany<typeof Role>

  @manyToMany(() => Function, {
    pivotTable: 'users_functions',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'function_id',
  })
  declare functions: ManyToMany<typeof Function>

  @manyToMany(() => Reservation, {
    pivotTable: 'users_reservations',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'reservations_id',
  })
  declare reservations: ManyToMany<typeof Reservation>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
