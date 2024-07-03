import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../app.module'
import request from 'supertest'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

describe('Fetch orcamentos (E2E)', () => {
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

  test('[GET] /orcamentos', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Alexandre Teste',
        email: 'aleteste@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.orcamento.createMany({
      data: [
        {
          name: 'Conta de Luz',
          valor: 120.0,
          userId: user.id,
        },
        {
          name: 'Conta de Agua',
          valor: 120.0,
          userId: user.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/orcamentos')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      orcamento: [
        expect.objectContaining({ name: 'Conta de Luz' }),
        expect.objectContaining({ name: 'Conta de Agua' }),
      ],
    })
  })
})
