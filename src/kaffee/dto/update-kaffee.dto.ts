import { PartialType } from '@nestjs/mapped-types';
import { CreateKaffeeDto } from './createKaffee.dto';

export class UpdateKaffeeDto extends PartialType(CreateKaffeeDto) {}
