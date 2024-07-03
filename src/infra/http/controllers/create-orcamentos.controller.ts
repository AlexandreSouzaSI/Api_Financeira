import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { CreateOrcamentoUseCase } from 'src/domain/use-cases/orcamento-create-use-case'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const createOrcamentoBodySchema = z.object({
  name: z.string(),
  data: z.date().optional(),
  valor: z.number(),
  dataVencimento: z.date().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(createOrcamentoBodySchema)

type CreateOrcamentoBodySchema = z.infer<typeof createOrcamentoBodySchema>

@Controller('/orcamentos')
export class CreateOrcamentosController {
  constructor(private createOrcamento: CreateOrcamentoUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateOrcamentoBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, data, valor, dataVencimento } = body
    const userValidate = user.sub

    const result = await this.createOrcamento.execute({
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
