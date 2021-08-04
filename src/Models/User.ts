export default class User {
    name: String = '';
    email: String = '';
    phone_number: number = 0;
    gender: String = '';
    isDeleted: Boolean = false;
    user_id:String = '';

    constructor(){
    }

    createObjectResponse(response:any){
        let user = new User();
        user.user_id = response.user_id;
        user.name = response.name;
        user.email = response.email;
        user.phone_number = response.phone_number;
        user.gender = response.gender;
        user.isDeleted = response.isDeleted;
        return user;
    }

    createArrayResponse(response: Array<any>){
        let usersArray : Array<User> = [];
        for(let i=0;i<response.length;i++){
            usersArray.push(this.createObjectResponse(response[i]))
        }
        return usersArray;
    }
}