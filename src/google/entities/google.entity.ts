import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Google {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', nullable: true })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public place_id: string;

  @Column({ type: 'varchar', nullable: true })
  public street: string;

  @Column({ type: 'varchar', default: '0', nullable: true })
  public rating: string;

  @Column({ default: 0, nullable: true })
  public user_ratings_total: number;

  @Column({ default: 0, nullable: true })
  public price_level: number;

  @Column('text', { array: true, default: null, nullable: true })
  public types: string[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
