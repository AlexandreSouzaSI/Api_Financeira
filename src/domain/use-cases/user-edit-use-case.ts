import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user-repository'

interface EditUserUseCaseRequest {
  userId: string
  name: string
  password: string
}

@Injectable()
export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId, name, password }: EditUserUseCaseRequest) {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return null
    }

    user.name = name
    user.password = password

    await this.userRepository.save(user)

    return user
  }
}
