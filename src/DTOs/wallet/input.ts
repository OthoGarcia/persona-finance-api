import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import * as Joi from 'joi'
import { ApiProperty } from '@nestjs/swagger'

@JoiSchemaOptions({
  allowUnknown: false,
})
export class WalletInputDTO {
  @ApiProperty()
  @JoiSchema(Joi.string().required())
  name!: string
}
