import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne} from "typeorm";
import { Cart } from "./Cart";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column()
    login?: string;

    @Column()
    password?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt?: Date;

    @OneToOne(() => Cart, cart => cart.user, { onDelete: 'CASCADE' })
    cart?: Cart;

}