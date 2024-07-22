import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Users } from 'src/users/entities/user.entity';
@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid:string;
  
  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column()
  shippingAddress: string;

  @Column()
  paymentMethod: string;

  @Column()
  status: string;

  @Column()
  userId:number
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Users, user => user.orders)
  user: Users;

  @OneToMany(() => OrderItem, orderItem => orderItem.orders)
  orderItems: OrderItem[];

}
