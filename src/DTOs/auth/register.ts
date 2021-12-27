import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import * as Joi from 'joi'
import { ApiProperty } from '@nestjs/swagger'

@JoiSchemaOptions({
  allowUnknown: false,
})
export class RegisterDTO {
  @ApiProperty()
  @JoiSchema(Joi.string().required())
  name!: string

  @ApiProperty()
  @JoiSchema(Joi.string().email().required())
  email!: string

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  password!: string

  @ApiProperty()
  @JoiSchema(Joi.string().required().valid(Joi.ref('password')))
  confirmPassword!: string
}
