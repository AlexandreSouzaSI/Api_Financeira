import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user-repository'

interface DeleteUserUseCaseRequest {
  userId: string
}

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: DeleteUserUseCaseRequest) {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return null
    }

    await this.userRepository.delete(user)

    return user
  }
}
