import { Users } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    role: string;
  }
