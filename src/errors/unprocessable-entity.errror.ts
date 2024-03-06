import { StatusCodes } from 'http-status-codes'

export default class UnprocessableEntity extends Error {
  private code: number
  constructor(message: string) {
    super(message)
    this.code = StatusCodes.UNPROCESSABLE_ENTITY
  }
}