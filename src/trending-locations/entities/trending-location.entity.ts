import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TrendingLocation {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', nullable: true })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public place_id: string;

  @Column({ type: 'json', nullable: true })
  public image: JSON;

  @Column({ type: 'json', nullable: true })
  public details: JSON;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
