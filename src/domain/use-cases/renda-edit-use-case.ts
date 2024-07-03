import { Injectable } from '@nestjs/common'
import { RendaRepository } from '../repositories/renda-repository'

interface EditRendaUseCaseRequest {
  rendaId: string
  name: string
  data?: Date | null
  valor: number
}

@Injectable()
export class EditRendaUseCase {
  constructor(private rendaRepository: RendaRepository) {}

  async execute({ name, valor, data, rendaId }: EditRendaUseCaseRequest) {
    const renda = await this.rendaRepository.findById(rendaId)

    if (!renda) {
      return null
    }

    renda.name = name
    renda.valor = valor
    renda.data = data ?? null

    await this.rendaRepository.save(renda)

    return renda
  }
}
