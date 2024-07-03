import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Orcamento } from '../entities/orcamento'

export abstract class OrcamentoRepository {
  abstract create(data: Orcamento): Promise<void>
  abstract findById(id: string): Promise<Orcamento | null>
  abstract findManyRecent(
    params: PaginationParams,
    id: string,
  ): Promise<Orcamento[]>

  abstract save(data: Orcamento): Promise<void>
  abstract delete(data: Orcamento): Promise<void>
}
