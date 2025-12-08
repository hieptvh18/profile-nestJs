import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'profile_nestjs',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Chỉ dùng trong development, production nên set false
  autoLoadEntities: true,
};

