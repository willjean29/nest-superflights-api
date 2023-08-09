import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${metadata.data} must be a valid MongoDB ObjectId.`);
    }
    return value;
  }
}