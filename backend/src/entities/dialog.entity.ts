import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Dialog {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  phoneUser1: string;

  @Column()
  phoneUser2: string;

  @Column()
  lastMessage: string;

  @Column()
  lastMessageDate: Date;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];
}
