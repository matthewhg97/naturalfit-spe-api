import { Product } from "../models/Product";
import { AbstractController } from "./AbstractController";

export class ProductsController extends AbstractController {
  
  protected prefix: string = '/products'

  list() {
    return async function(req: any, res: any, next: any) {
      res.send(await Product.find());
    }
  }

  listOne() {
    return async function(req: any, res: any, next: any) {
      let product: Product | undefined = await Product.findOne({ id: req.params.id });
      if (product) {
        res.send(product);
      } else {
        res.status(404).send("product does not exist in the database.");
      }
    }
  }

  create() {
    return async function(req: any, res: any, next: any) {
      let product: Product = new Product();
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      product.quantity = req.body.quantity;
      product.isAvailable = req.body.isAvailable;
      await product.save();
      res.send(product);
    }
  }

  edit() {
    return async function(req: any, res: any, next: any) {
      let product: Product = await Product.findOne({ id: req.params.id }) as Product;
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      product.quantity = req.body.quantity;
      product.isAvailable = req.body.isAvailable;
      await product.save();
      res.send(product);
    }
  }

  delete() {
    return async function(req: any, res: any, next: any) {
      let product: Product = await Product.findOne({ id: req.params.id }) as Product;
      await product.remove();
      res.send(product);
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