import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TopCountrySearch {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  public totalSearchTime: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
