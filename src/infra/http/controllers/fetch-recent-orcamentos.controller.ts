import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchRecentOrcamentoUseCase } from 'src/domain/use-cases/orcamento-fetch-recent-use-case'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { OrcamentoPresenter } from '../presenters/orcamento-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/orcamentos')
export class FetchOrcamentosController {
  constructor(private fetchRecentOrcamento: FetchRecentOrcamentoUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userValidate = user.sub

    const result = await this.fetchRecentOrcamento.execute({
      page,
      userId: userValidate,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const orcamento = result.value.orcamento

    return { orcamento: orcamento.map(OrcamentoPresenter.toHTTP) }
  }
}
