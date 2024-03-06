import { StatusCodes } from 'http-status-codes'

export default class Forbidden extends Error {
  private code: number
  constructor(message: string) {
    super(message)
    this.code = StatusCodes.FORBIDDEN
  }
}