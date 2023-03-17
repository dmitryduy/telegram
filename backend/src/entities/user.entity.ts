import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Dialog } from './dialog.entity';
import { DialogInfo } from './dialogInfo.entity';

type themeColor =
  | '#40a7e3'
  | '#45bce7'
  | '#52b440'
  | '#d46c99'
  | '#df8a49'
  | '#9978c8'
  | '#c55245'
  | '#687b98'
  | '#dea922';

@Entity()
export class User {
  @PrimaryColumn()
  phoneNumber: string;

  @Column({ nullable: true })
  isOnline: boolean;

  @Column()
  nickname: string;

  @CreateDateColumn()
  lastSeen: Date;

  @Column({ default: '#40a7e3' })
  avatar: themeColor;

  @Column({ default: 'default' })
  backgroundImage: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @OneToMany(() => DialogInfo, (dialogInfo) => dialogInfo.user)
  dialogInfo: DialogInfo[];

  @ManyToMany(() => Dialog)
  @JoinTable()
  dialogs: Dialog[];
}
