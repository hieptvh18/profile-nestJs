import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { Me } from './entities/me.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Me])],
  controllers: [MeController],
  providers: [MeService],
  exports: [MeService],
})
export class MeModule {}
