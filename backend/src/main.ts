import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import * as dotenv from 'dotenv'; // 1. Import dotenv
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Prefix cho API (Theo Spec: /api/v1/...)
  app.setGlobalPrefix('api/v1');

  // 2. Cấu hình ValidationPipe (Để RegisterDto hoạt động)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các field không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có field lạ gửi lên
      transform: true, // Tự động convert kiểu dữ liệu (vd: string -> number)
    }),
  );

  // 3. Đăng ký Global Exception Filter (Để trả về JSON lỗi chuẩn Spec)
  app.useGlobalFilters(new AllExceptionsFilter());

  // 4. Bật CORS (Để Frontend Next.js có thể gọi API)
  app.enableCors({
    origin: true, // Trong môi trường dev có thể để true, production nên giới hạn domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server is running on: http://localhost:${port}/api/v1`);
}
bootstrap();
