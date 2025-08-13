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
            return await this.dataBases.updateDocument(
                environment_variables.appwriteDatabaseId, 
                environment_variables.appwriteCollectionId, 
                slug, 
                {title , featuredImg , content , status, author }
            )
        } catch (error) {
            console.log("Error updating post:", error);
            throw error;
        }
    }
    
    async deletePost(slug){
        try {
            return await this.dataBases.deleteDocument(
                environment_variables.appwriteDatabaseId, 
                environment_variables.appwriteCollectionId, 
                slug
            )
        } catch (error) {
            console.log("Error deleting post:", error);
            throw error;
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
        if (!userId) {
            console.error("Error: userId is null or undefined.");
            return { documents: [] };
        }

        try {
            const response = await this.dataBases.listDocuments(
                environment_variables.appwriteDatabaseId,
                environment_variables.appwriteCollectionId,
                [Query.equal('userId', [userId])]
            );
            return response;
        } catch (error) {
            console.error("Error fetching user posts from Appwrite:", error);
            return { documents: [] };
        }
    }

    

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                environment_variables.appwriteBucketId, 
                ID.unique(), 
                file
            )
        } catch (error) {
            console.log("Error uploading file:", error);
            throw error;
        }
    }
    
    async filePreview(fileId){
        try{
            const result = await this.storage.getFileView(
                environment_variables.appwriteBucketId, 
                fileId
            )
            console.log("the file url is : ", result)
            return result;
        } catch(error) {
            console.log("Error getting file preview:", error);
            throw error;
        }
    }
    
    async deleteTheFile(fileId){
        try {
            await this.storage.deleteFile(
                environment_variables.appwriteBucketId, 
                fileId
            )
            return true
        } catch (error) {
            console.log("Error deleting file:", error);
            return false;
        }
    }
}

const services = new Service();
export default services;
