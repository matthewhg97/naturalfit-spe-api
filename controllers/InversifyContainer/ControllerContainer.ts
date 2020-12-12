import { Container } from "inversify";
import { CartController } from "../CartController";
import { IController } from "../IController";
import { IndexController } from "../IndexController";
import { ProductsController } from "../ProductsController";
import { UsersController } from "../UsersController";
import ControllerTypes from "./ControllerTypes";

const ControllerContainer = new Container();

ControllerContainer.bind<IController>(ControllerTypes.Controller).to(ProductsController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(CartController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(IndexController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(UsersController);

export default ControllerContainer;