import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public location_id: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public street: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public city: string;

  @Column({ type: 'varchar', default: false, nullable: true })
  public country: string;

  @Column({ type: 'varchar', default: false, nullable: true })
  public rating: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public postalcode: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
