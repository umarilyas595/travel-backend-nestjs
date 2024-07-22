import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class WorldCoutriesCity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', nullable: false })
  public city: string;

  @Column({ type: 'varchar', nullable: false })
  public city_ascii: string;

  @Column({ type: 'varchar', nullable: false })
  public iso2!: string;

  @Column({ type: 'varchar', nullable: false })
  public iso3!: string;

  @Column({ type: 'varchar', nullable: false })
  public country: string;

  @Column({ type: 'varchar', nullable: false })
  public admin_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
