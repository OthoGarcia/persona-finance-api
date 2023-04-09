import { ApiProperty } from "@nestjs/swagger";
import * as Joi from 'joi'
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateCategoryDto {
  @ApiProperty()
  @JoiSchema(Joi.string().required())
  name: string

  @ApiProperty()
  @JoiSchema(Joi.number())
  parentId?: number
}
