import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Me } from './entities/me.entity';
import { CreateMeDto } from './dto/create-me.dto';
import { UpdateMeDto } from './dto/update-me.dto';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(Me)
    private readonly meRepository: Repository<Me>,
  ) {}

  async create(createMeDto: CreateMeDto): Promise<Me> {
    const me = this.meRepository.create(createMeDto);
    return await this.meRepository.save(me);
  }

  async findAll(): Promise<Me[]> {
    return await this.meRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Me> {
    const me = await this.meRepository.findOne({ where: { id } });
    
    if (!me) {
      throw new NotFoundException(`Me with ID ${id} not found`);
    }
    
    return me;
  }

  async update(id: number, updateMeDto: UpdateMeDto): Promise<Me> {
    const me = await this.findOne(id);
    
    Object.assign(me, updateMeDto);
    return await this.meRepository.save(me);
  }

  async remove(id: number): Promise<void> {
    const me = await this.findOne(id);
    await this.meRepository.remove(me);
  }

  async search(keyword: string): Promise<Me[]> {
    return await this.meRepository
      .createQueryBuilder('me')
      .where('me.name LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('me.email LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('me.phone LIKE :keyword', { keyword: `%${keyword}%` })
      .orderBy('me.createdAt', 'DESC')
      .getMany();
  }
}
