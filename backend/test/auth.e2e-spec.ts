import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';

describe('AuthController (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const testUser = {
    email: 'integration@test.com',
    password: '123456!',
    confirmPassword: '123456!',
    fullName: 'Integration Test User',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
  });

  // ================= REGISTER =================
  describe('/auth/register (POST)', () => {
    it('nên đăng ký người dùng mới thành công', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe(testUser.email);
      expect(response.body.data).not.toHaveProperty('password');
    });

    it('nên trả về lỗi nếu email đã tồn tại', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(201);

      // đăng ký lại
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(409);
    });
  });

  // ================= LOGIN =================
  describe('/auth/login (POST)', () => {
    beforeEach(async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(201);
    });

    it('nên đăng nhập thành công và trả về token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);

      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data).toHaveProperty('refreshToken');
    });

    it('nên trả về 401 nếu sai mật khẩu', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: 'WrongPassword123!',
        })
        .expect(401);
    });

    it('nên trả về 401 nếu email không tồn tại', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'notfound@test.com',
          password: testUser.password,
        })
        .expect(401);
    });
  });
});
