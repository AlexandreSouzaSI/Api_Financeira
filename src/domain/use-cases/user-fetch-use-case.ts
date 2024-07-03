import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user-repository'

interface FetchUserUseCaseRequest {
  userId: string
}

@Injectable()
export class FetchUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: FetchUserUseCaseRequest) {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return null
    }

    return user
  }
}
