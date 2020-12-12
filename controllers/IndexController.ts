import { AbstractController } from "./AbstractController"

export class IndexController extends AbstractController {
    protected prefix: string = '/';

    index() {
      return function(req: any, res: any, next: any) {
        res.send("naturalfit API V0");
      }
    }
    
    registerRoutes() {
      this.forRoute('/').get(this.index());
    }
}