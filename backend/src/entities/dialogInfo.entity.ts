import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class DialogInfo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  unreadMessageCount: number;

  @Column()
  partnerPhone: string;

  @Column()
  partnerAvatar: string;

  @Column()
  partnerAvatarContent: string;

  @Column()
  partnerFullName: string;

  @ManyToOne(() => User, (user) => user.dialogInfo)
  user: User;
}
