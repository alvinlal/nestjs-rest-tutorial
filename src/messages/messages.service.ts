import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'Alvin', text: 'heyoo' }];
  users = {};

  create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    this.messages.push(message);
    return message;
  }

  getUserName(id: string) {
    return this.users[id];
  }

  findAll() {
    return this.messages;
  }

  join(name: string, id: string) {
    this.users[id] = name;
    return Object.values(this.users);
  }
}
