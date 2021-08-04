import express from "express";
import UserService from '../Services/UserService';
import User from '../Models/User';
import { logger } from "express-winston";

export class UserController{

    userService: UserService;
    constructor(){
        this.userService = new UserService();
    }

    /*
        listUsers is for listing all the users, with pagination
    */
    async fetchUsers(req: express.Request, res: express.Response) {
        try{
            const start  = req.query.start ? Number(req.query.start) : 0;
            let end   = req.query.end ? Number(req.query.end) : 5;
            end = end - start;
            const result = await this.userService.fetchUsers(start, end);
            res.send({data:result});
        }catch(err){
            res.status(500).send({ error: "Failed to fetch users" });
        }
    }

    /*
       createUser is for creating new user
    */
    async create(req: express.Request, res: express.Response) {
        try{
            const user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.phone_number = req.body.phone_number;
            user.gender = req.body.gender;
            const result = await this.userService.create(user);
            res.send({data:result});
        }catch(error){
            res.status(500).send({ error: "Failed to create user" });
        }
    }

    /*
       userDetails is for creating new user
    */
       async details(req: express.Request, res: express.Response) {
        try {
            const user = new User();
            user.user_id = req.params.userId;
            const result = await this.userService.details(user);
            res.send({data:result});   
        } catch (error) {
            res.status(500).send({ error: "Failed to fetch user details" });
        }
    }

    /*
       update is for update an existing user
    */
       async update(req: express.Request, res: express.Response) {
        try {
            const user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.phone_number = req.body.phone_number;
            user.gender = req.body.gender;
            user.user_id = req.params.userId;
            const result = await this.userService.update(user);
            res.send({data:result});   
        } catch (error) {
            res.status(500).send({ error: "Failed to update user" });
        }
    }

    /*
       remove is to delete a user
    */
       async remove(req: express.Request, res: express.Response) {
        try{
            const user = new User();
            user.user_id = req.params.userId;
            const result = await this.userService.remove(user);
            res.send({data:result});
        }catch(err){
            res.status(500).send({ error: "Failed to delete user" });
        }
    }
}
