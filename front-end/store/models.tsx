export interface IUsersItem {
  _id?: String
  createdAt: Date

  FirstName: string

  LastName: string

  Email: string

  Password: String

  ProfilePic: string

  Role: String
}

export interface IpaginatedUsers {
  docs: IUsersItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface ITicketsItem {
  _id?: String
  createdAt: Date

  ID: Number

  Nombre: string

  Descripcion: string

  Importancia: String

  Usuario: string
}

export interface IpaginatedTickets {
  docs: ITicketsItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
