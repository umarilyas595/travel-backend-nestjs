import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public first_name: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public second_name: string;

  @Column({ type: 'varchar', nullable: true })
  public review: string;

  @Column({ type: 'float', default: 0.0 })
  public rating: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
