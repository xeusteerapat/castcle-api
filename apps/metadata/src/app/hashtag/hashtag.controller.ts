import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { HashtagService } from './hashtag.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('metadata')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get('hashtags')
  async getAll() {
    const hashtags = await this.hashtagService.findAll();

    return {
      message: 'success message',
      payload: hashtags,
    };
  }

  @Post('hashtags')
  async createHashtag(@Body() createHashtag: CreateHashtagDto) {
    return await this.hashtagService.create(createHashtag);
  }
}
