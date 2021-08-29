import { Hashtag, HashtagSchema } from './schema/hashtag.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';

@Module({
  providers: [HashtagService],
  controllers: [HashtagController],
  imports: [
    MongooseModule.forFeature([{ name: Hashtag.name, schema: HashtagSchema }]),
  ],
})
export class HashtagModule {}
