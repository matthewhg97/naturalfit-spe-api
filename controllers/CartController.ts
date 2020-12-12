import { Cart } from "../models/Cart";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";
import { AbstractController } from "./AbstractController";

export class CartController extends AbstractController {
    protected prefix: string = '/cart';

    index() {
        return async function(req: any, res: any, next: any) {
            res.send("cart index")
        }
    }

    viewCart() {
        return async function(req: any, res: any, next: any) {
          let cart: Cart = await Cart.findOne({ where: {id: req.params.id}, relations: ["user","items","items.product"] }) as Cart;
          if (cart) {
              res.send(cart);
          } else {
              res.status(404).send("this cart does not exist in the database.");
          }
        }
    }

    viewAllCarts() {
        return async function(req: any, res: any, next: any) {
          res.send(await Cart.find({ relations: ["user","items","items.product"] }));
        }
    }

    viewItems() {
        return async function(req: any, res: any, next: any) {
          res.send(await CartItem.find({ relations: ["cart","product"] }));
        }
    }

    addItem() {
        return async function(req: any, res: any, next: any) {
            let product: Product = await Product.findOne({ name: req.body.productName }) as Product;
            let cart: Cart = await Cart.findOne({ id: req.body.cartId }) as Cart;
            if (product && cart) {
                let item: CartItem = new CartItem();
                item.product = product;
                item.cart = cart;
                item.quantity = req.body.quantity;
                await item.save();
                res.send(item);
            }          
        }
    }

    removeItem() {
        return async function(req: any, res: any, next: any) {
          let item: CartItem = await CartItem.findOne({ id: req.params.id }) as CartItem;
          await item.remove();
          res.send(item);
        }
    }
    
    delete() {
      return async function(req: any, res: any, next: any) {
        let cart: Cart = await Cart.findOne({ id: req.params.id }) as Cart;
        await cart.remove();
        res.send(cart);
      }
    }
  

    registerRoutes() {
        this.forRoute('/').get(this.index());

        this.forRoute('/items').get(this.viewItems());

        this.forRoute('/carts').get(this.viewAllCarts());
        this.forRoute('/:id').get(this.viewCart());
        this.forRoute('/:id').delete(this.delete());

        this.forRoute('/items').post(this.addItem());
        this.forRoute('/items/:id').delete(this.removeItem());
    }
}