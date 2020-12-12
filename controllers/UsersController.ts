import { Cart } from "../models/Cart";
import { User } from "../models/User";
import { AbstractController } from "./AbstractController";

export class UsersController extends AbstractController {
  
  protected prefix: string = '/users'

  list() {
    return async function(req: any, res: any, next: any) {
      res.send(await User.find());
    }
  }

  listOne() {
    return async function(req: any, res: any, next: any) {
      let user: User | undefined = await User.findOne({ where: {id: req.params.id}, relations: ["cart", "cart.items"] });
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("user does not exist in the database.");
      }
    }
  }

  create() {
    return async function(req: any, res: any, next: any) {
      let user: User = new User();
      user.name = req.body.name;
      user.login = req.body.login;
      user.password = req.body.password;
      await user.save();
      
      let cart: Cart = new Cart();
      cart.user = user;
      await cart.save();
      res.send(user);
    }
  }

  edit() {
    return async function(req: any, res: any, next: any) {
      let user: User = await User.findOne({ id: req.params.id }) as User;
      user.name = req.body.name;
      user.login = req.body.login;
      user.password = req.body.password;
      await user.save();
      res.send(user);
    }
  }

  delete() {
    return async function(req: any, res: any, next: any) {
      let user: User = await User.findOne({ id: req.params.id }) as User;
      await user.remove();
      res.send(user);
    }
  }

  registerRoutes() {
    this.forRoute('/').get(this.list());
    this.forRoute('/:id').get(this.listOne());
    this.forRoute('/').post(this.create());
    this.forRoute('/:id').put(this.edit());
    this.forRoute('/:id').delete(this.delete());
  }

}