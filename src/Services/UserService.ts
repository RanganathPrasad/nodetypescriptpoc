import UserRepository from '../Repositories/UserRepository';
import User from '../Models/User';

export default class UserService{

    userRepository:UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }
    
    async fetchUsers(start:number, end:number) {
        try{
            const {users, count} = await this.userRepository.fetchUsers(start, end);
            const user = new User();
            const usersArray = user.createArrayResponse(users);
            return {
                users:usersArray,
                count
            }
        }catch(err){
            throw err;
        }
    }

    async create(userInput:User) {
        try{
            const result = await this.userRepository.create(userInput);
            const user = new User();
            const userDetails =  user.createObjectResponse(result);
            return userDetails;
        }catch(error){
            throw error;
        }
    }

    async details(userInput:User) {
        try{
            const result = await this.userRepository.details(userInput);
            const user = new User();
            if(result){
                const userDetails =  user.createObjectResponse(result);
                return userDetails;
            }
            return null;
        }catch(err){
            throw err;
        }
    }

    async update(userInput:User) {
        try{
            const result = await this.userRepository.update(userInput);
            if(result){
                const user = new User();
                const userDetails =  user.createObjectResponse(result);
                return userDetails;
            }
            return null;
        }catch(err){
            throw err;   
        }
    }

    async remove(userInput:User) {
        try{
            return await this.userRepository.remove(userInput);
        }catch(err){
            throw err;
        }
    }
}