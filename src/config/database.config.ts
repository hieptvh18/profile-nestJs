import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'profile_nestjs',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  
  // QUAN TRỌNG: Trong production với RDS Aurora, set synchronize = false
  // Dùng migrations thay vì auto-sync schema
  synchronize: process.env.DB_SYNCHRONIZE === 'true' || process.env.NODE_ENV !== 'production',
  
  autoLoadEntities: true,
  
  // Logging - disable trong production để tăng performance
  logging: process.env.DB_LOGGING === 'true' || process.env.NODE_ENV === 'development',
  
  // SSL/TLS config cho RDS Aurora (recommended)
  // RDS Aurora support SSL by default
  extra: {
    // Enable SSL nếu env var DB_SSL = 'true' (dùng cho RDS Aurora)
    ssl: process.env.DB_SSL === 'true' ? {
      // Không verify certificate (để đơn giản)
      // Trong production thật, nên download RDS CA certificate và verify
      rejectUnauthorized: false,
    } : undefined,
    
    // Connection pool settings cho RDS
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
    
    // Timeout settings
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || '10000', 10), // 10 seconds
    acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT || '10000', 10),
  },
  
  // Retry logic cho RDS connection
  retryAttempts: parseInt(process.env.DB_RETRY_ATTEMPTS || '3', 10),
  retryDelay: parseInt(process.env.DB_RETRY_DELAY || '3000', 10), // 3 seconds
};

