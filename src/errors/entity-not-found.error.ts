import { StatusCodes } from 'http-status-codes';

export class EntityNotFound extends Error {
  private code: number
  constructor(message: string = 'Not found error') {
    super(message)
    this.code = StatusCodes.NOT_FOUND
  }
}