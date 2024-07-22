import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TopRestaurant {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', nullable: true })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public place_id: string;

  @Column({ type: 'varchar', nullable: true })
  public image: string;

  @Column({ type: 'json', nullable: true })
  public details: JSON;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
