import conf from '../conf.js';
import {Client,Account,ID} from appwrite;

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndPoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID)
        this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){  // curly braces to destructure the object we are hoing to pass into this method
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){ // if user account created succsessfully then we login
                // method call to login user
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }
    async login(email,password){
        try{
            await this.account.createEmailSession(email,password);
        }
        catch(error){
            throw error;
        }
        }
        async getCurrentUser(){
            try{
                return await this.account.get();
            }
            catch(error){
                console.log("error in appwrite auth -> get current user ",error);
            }
            return null;
    }
    async logout(){
        try{
            return await this.account.deleteSessions();//deletes all sessions use delete session to delete a specific function
        }
        catch(error){
            console.log("appwrite->logout func ",error)
        }
    }
}


const AuthService = new AuthService();

export default AuthService;