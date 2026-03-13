import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  subtitle!: string;

  @Column()
  theme!: string;

  @Column()
  type!: string;

  @Column()
  inboxCount!: number;

  @Column()
  clockCount!: number;

  @Column()
  status!: string;

  @Column()
  delivered!: string;

  @Column()
  opened!: string;

  @Column()
  clicked!: string;

  @Column()
  converted!: string;
}
