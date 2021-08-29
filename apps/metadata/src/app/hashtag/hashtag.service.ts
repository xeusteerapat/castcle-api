import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { Hashtag, HashtagDocument } from './schema/hashtag.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HashtagService {
  constructor(
    @InjectModel(Hashtag.name) private readonly model: Model<HashtagDocument>
  ) {}

  async findAll(): Promise<Hashtag[]> {
    return await this.model.find().lean();
  }

  async create(createHashtagDto: CreateHashtagDto): Promise<Hashtag> {
    return await new this.model({
      ...createHashtagDto,
      created: new Date(),
      updated: new Date(),
    }).save();
  }
}
