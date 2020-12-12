import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne} from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

// cada cartItem tem um produto, utilizando a coluna quantity para identificar quantos produtos foram adicionados
@Entity()
export class CartItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Product, product => product.cartItems, { onDelete: 'CASCADE' })
    @JoinColumn()
    product?: Product;

    @Column({ default: 1 })
    quantity?: number;

    @ManyToOne(() => Cart, cart => cart.items, { onDelete: 'CASCADE' })
    @JoinColumn()
    cart?: Cart;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt?: Date;

}