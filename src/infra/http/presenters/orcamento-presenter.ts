import { Orcamento } from 'src/domain/entities/orcamento'

export class OrcamentoPresenter {
  static toHTTP(orcamento: Orcamento) {
    return {
      id: orcamento.id.toString(),
      name: orcamento.name,
      data: orcamento.data,
      valor: orcamento.valor,
      dataVencimento: orcamento.dataVencimento,
      createdAt: orcamento.createdAt,
      updatedAt: orcamento.updatedAt,
      userId: orcamento.userId.toString(),
    }
  }
}
