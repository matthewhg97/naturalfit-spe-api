import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { CartItem } from "./CartItem";
import { User } from "./User";

// cada usuário possui um carrinho
@Entity()
export class Cart extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user?: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt?: Date;

    @OneToMany(() => CartItem, cartItem => cartItem.cart, { onDelete: 'CASCADE' })
    @JoinColumn()
    items?: CartItem[];

}