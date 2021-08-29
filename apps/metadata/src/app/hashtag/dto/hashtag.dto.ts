import { ObjectId } from 'mongoose';

export class HashtagDto {
  id: ObjectId;
  slug: string;
  name: string;
  key: string;
  created: Date;
  updated: Date;
}
