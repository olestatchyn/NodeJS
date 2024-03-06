import { StatusCodes } from 'http-status-codes'

export default class BadRequestError extends Error {
  private code: number
  constructor(message = 'Bad Request') {
    super(message)
    this.code = StatusCodes.BAD_REQUEST
  }
}