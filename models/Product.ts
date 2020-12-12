import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, BeforeInsert} from "typeorm";
import { CartItem } from "./CartItem";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column()
    description?: string;

    @Column()
    price?: string;

    @Column({ default: 0 })
    quantity?: number;

    @Column()
    isAvailable?: boolean;
    @BeforeInsert()
    setAvailability() {
        this.isAvailable = false;
    }

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt?: Date;

    @OneToMany(() => CartItem, cartItem => cartItem.product)
    @JoinColumn()
    cartItems?: CartItem[];
}