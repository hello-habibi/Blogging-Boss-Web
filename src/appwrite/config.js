import { Client, Databases, ID, Query, Storage } from "appwrite";
import environment_variables from "../confi/confi";

export class Service{
    
     client = new Client();
     dataBases;
     storage;

    constructor(){
        this.client.setEndpoint(environment_variables.appwriteURL)
        this.client.setProject(environment_variables.appwrieProjectId)
        this.dataBases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content,author , featuredImg , status , userId}){

        try{
            const response = await this.dataBases.createDocument(environment_variables.appwriteDatabaseId, environment_variables.appwriteCollectionId,slug ,{status , featuredImg ,author,  content , title , userId} )
            return response;
        }catch(error){
            console.log("error in creating post :: " , error);
        }
    }
    async getAllPosts(){
        try{
            const data = await this.dataBases.listDocuments(
                environment_variables.appwriteDatabaseId,
                environment_variables.appwriteCollectionId

            )
            return data;
        }catch(err){
            console.log(err);
        }
    }

    async updatePost(slug , {title ,author ,  content , featuredImg , status }){

        try {
            return await this.dataBases.updateDocument(environment_variables.appwriteDatabaseId , environment_variables.appwriteCollectionId , slug , {title , featuredImg , content , status })
        } catch (error) {
            
        }
    }
     async deletePost({slug}){
        try {
            return await this.dataBases(
                environment_variables.appwriteDatabaseId, 
                environment_variables.appwriteCollectionId, 
                slug
            )
        } catch (error) {
            console.log(error);
            return false;
            
        }
     }
     async getPost({slug}){
        return await this.dataBases.getDocument(
            environment_variables.appwriteDatabaseId, 
            environment_variables.appwriteCollectionId, 
            slug
        )
     }
    async getUserPosts(userId) {
        // Validate the userId
        if (!userId) {
            console.error("Error: userId is null or undefined.");
            return { documents: [] }; // Return an empty object to prevent further issues
        }

        try {
            // Attempt to fetch documents with the given userId
            const response = await this.dataBases.listDocuments(
                environment_variables.appwriteDatabaseId,
                environment_variables.appwriteCollectionId,
                [Query.equal('userId', [userId])]
            );

            // Log the response for debugging purposes
            console.log("Documents fetched successfully:", response);
            return response;
        } catch (error) {
            // Log the error and return a fallback value
            console.error("Error fetching user posts from Appwrite:", error);
            return { documents: [] }; // Return an empty array in case of an error
        }
    }


     async uploadFile(file){
        try {
            return await this.storage.createFile(
                environment_variables.appwriteBucketId , 
            ID.unique() , 
        file
    )
        } catch (error) {
            console.log(error)
            
        }
     }
     async filePreview(fileId){
        try{
            const result = await this.storage.getFileView(
                environment_variables.appwriteBucketId , 
                fileId)
            return result;
        }
        catch{

        }

     }
     async deleteTheFile(fileId){
        try {
            await this.storage.deleteFile(
                environment_variables.appwriteBucketId , 
                fileId
            )
            return true
        } catch (error) {
            console.log(error);
            return false;
            
        }
     }

}

const services = new Service();
export default services 