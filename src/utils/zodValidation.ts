import { PipeTransform, ArgumentMetadata, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) { }

    transform(value: unknown, metadata: ArgumentMetadata) {
        try {
            const parsedValue = this.schema.safeParse(value);
            if (!parsedValue.success) {
                throw new BadRequestException(parsedValue.error.errors)
            }
            return parsedValue.data
        } catch (error) {
            if(error instanceof BadRequestException){
                throw error
            }
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}