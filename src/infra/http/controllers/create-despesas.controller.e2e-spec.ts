import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../app.module'
import request from 'supertest'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

describe('Create despesa (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /despesa', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Alexandre Teste',
        email: 'aleteste@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/despesa')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Conta de Luz',
        valor: 120.0,
      })

    expect(response.statusCode).toBe(201)

    const despesaOnDatabase = await prisma.despesas.findFirst({
      where: {
        name: 'Conta de Luz',
      },
    })

    expect(despesaOnDatabase).toBeTruthy()
  })
})
