import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { N8nBlogPostDto } from './dto/n8n-post.dto';

@Injectable()
export class WebhooksService {
  constructor(private postsService: PostsService) {}

  async createPostFromN8n(data: N8nBlogPostDto) {
    return this.postsService.createFromN8n(data);
  }
}
