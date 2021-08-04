import users from '../schemas/users_schema';
import User from '../Models/User';
import { uuid } from 'uuidv4';

export default class UserRepository{

    constructor(){}
    
    async fetchUsers(start:number, end:number) {
        try{
            const result = await users.find({isDeleted:false}).skip(start).limit(end);
            const count = await users.find({isDeleted:false}).count();
            return {users:result,count:count};
        }catch(error){
            throw error;
        }
    }

    async create(user:User) {
        try{
            const user_id = uuid(); 
            user.user_id = user_id;
            await users.insertMany([user]);
            const result = await users.findOne({user_id:user_id})
            return result;
        }catch(err){
            throw err;
        }
    }

    async details(user:User) {
        try{
            const result = await users.findOne({user_id:user.user_id,isDeleted:false})
            return result;
        }catch(err){
            throw err;
        }
    }

    async update(user:User) {
        try{
            const user_id = user.user_id;
            await users.updateOne({user_id:user_id},{$set:{name:user.name,email:user.email,phone_number:user.phone_number}});
            const result = await users.findOne({user_id:user_id})
            return result;
        }catch(err){
            throw err;
        }
    }

    async remove(user:User) {
        try{
            await users.updateOne({user_id:user.user_id},{$set:{isDeleted:true}});
            return {status:true};
        }catch(err){
            throw err;
        }
    }
}