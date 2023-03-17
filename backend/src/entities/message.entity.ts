import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dialog } from './dialog.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  createdDate: Date;

  @Column()
  content: string;

  @Column()
  sender: string;

  @ManyToOne(() => Dialog, (dialog) => dialog.messages)
  dialog: Dialog;
}
