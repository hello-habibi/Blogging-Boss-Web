import { Account, Client, ID } from "appwrite";
import environment_variables from "../confi/confi";

export class AuthServices {
    client = new Client();
    account ;

    constructor (){
        this.client
        .setEndpoint(environment_variables.appwriteURL)
        .setProject(environment_variables.appwrieProjectId);

        this.account = new Account(this.client);
    }
    async createAccount ({email , password , name}){
        try {
            const user = await this.account.create(
                ID.unique(),
                email , 
                password,
                name
            )
            await this.logIn({email , password});
            return user;
        } catch (err ) {
            
            console.log(err);
            throw err
        }
    }
    async logIn({email , password}){
        try {
            const result = await this.account.createEmailPasswordSession(
                email ,
                password
            )
            console.log(result);
            return result;
        } catch (error) {
            console.log(error)
            return null;
            
        }
    }
    async getLoggedInUser(){
        try {

            return await this.account.get()
            
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async logOut(){
        try {
            const session = await this.getLoggedInUser();
            console.log(session.$id)
            const result = await this.account.deleteSessions(session.$id)
            console.log(result)
            return true;

        } catch (error) {
            console.log(error)
            return false

        }

    }

    




}


const authServices = new AuthServices();

export default authServices