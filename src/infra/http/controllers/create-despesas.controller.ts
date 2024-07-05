import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { CreateDespesasUseCase } from 'src/domain/use-cases/despesas-create-use-case'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const createDespesasBodySchema = z.object({
  name: z.string(),
  data: z.date().optional(),
  valor: z.number(),
  dataVencimento: z.date().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(createDespesasBodySchema)

type CreateDespesasBodySchema = z.infer<typeof createDespesasBodySchema>

@Controller('/despesa')
export class CreateODespesasController {
  constructor(private createDespesas: CreateDespesasUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateDespesasBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, data, valor, dataVencimento } = body
    const userValidate = user.sub

    const result = await this.createDespesas.execute({
      userId: new UniqueEntityId(userValidate),
      name,
      valor,
      data,
      dataVencimento,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
