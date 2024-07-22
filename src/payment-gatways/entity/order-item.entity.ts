import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Orders } from './order.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;


  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  orderId:number;

  @ManyToOne(() => Orders, order => order.orderItems)
  orders: Orders;

  @ManyToOne(() => Product)
  product: Product;
}
