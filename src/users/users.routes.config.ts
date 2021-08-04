import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import { UserController } from '../Controllers/UserController';

export class UsersRoutes extends CommonRoutesConfig {

    userController : UserController;
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
        this.userController = new UserController();
    }

    configureRoutes() {
        this.app.route(`/users`)
        .get((req: express.Request, res: express.Response) => {
            this.userController.fetchUsers(req,res)
        })
        .post((req: express.Request, res: express.Response) => {
            this.userController.create(req,res)
        });
        this.app.route(`/users/:userId`)
        .get(this.checkIfUserIdExists,(req: express.Request, res: express.Response) => {
            this.userController.details(req,res);
        })
        .put(this.checkIfUserIdExists,(req: express.Request, res: express.Response) => {
            this.userController.update(req,res);
        })
        .delete(this.checkIfUserIdExists,(req: express.Request, res: express.Response) => {
            this.userController.remove(req,res)
        });
        return this.app;
    }

    checkIfUserIdExists(req: express.Request, res: express.Response, next: any){
        if(!req.params.userId){
            res.status(500).send({ error: "userId is mandatory" });
            return;
        }
        next();
    }

}