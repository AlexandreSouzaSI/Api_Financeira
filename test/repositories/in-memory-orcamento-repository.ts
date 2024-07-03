import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Orcamento } from 'src/domain/entities/orcamento'
import { OrcamentoRepository } from 'src/domain/repositories/orcamento-repository'

export class InMemoryOrcamentoRepository implements OrcamentoRepository {
  public items: Orcamento[] = []

  async create(orcamento: Orcamento) {
    this.items.push(orcamento)
  }

  async findById(id: string) {
    const orcamento = this.items.find((item) => item.id.toString() === id)

    if (!orcamento) {
      return null
    }

    return orcamento
  }

  async findManyRecent({ page }: PaginationParams, id: string) {
    const filteredOrcamentos = this.items.filter(
      (item) => item.userId.toString() === id,
    )

    const orcamento = filteredOrcamentos
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return orcamento
  }

  async save(orcamento: Orcamento) {
    const itemIndex = this.items.findIndex((item) => item.id === orcamento.id)

    this.items[itemIndex] = orcamento
  }

  async delete(orcamento: Orcamento) {
    const itemIndex = this.items.findIndex((item) => item.id === orcamento.id)

    this.items.splice(itemIndex, 1)
  }
}
