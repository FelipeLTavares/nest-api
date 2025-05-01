import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyInUseException extends HttpException {
  constructor(email: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `The e-mail '${email}' is already in use.`,
        error: 'Conflict',
      },
      HttpStatus.CONFLICT,
    );
  }
}