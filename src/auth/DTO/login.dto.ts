import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import * as Joi from 'joi'
import { ApiProperty } from '@nestjs/swagger'

@JoiSchemaOptions({
  allowUnknown: false,
})
export class LoginDTO {
  @ApiProperty()
  @JoiSchema(Joi.string().email().required())
  email!: string

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  password!: string
}
