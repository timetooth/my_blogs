import conf from '../conf.js';
import {Client,ID,Databases,Storage} from appwrite;

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.ProjectID)
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({title,content,slug,featuredimage,status,userid}){
        try{
        return await this.databases.createDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredimage,
                status,
                userid
            }
        )
        }
        catch(error){
            console.log("apprwite - database config - create post function error: ",error);
        }
    }
    async updatePost(slug,{title,content,featuredimage,status}){
        // we didnt take in user id cuz we dint wanna update that
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
            )
            }
            catch(error){
                console.log("apprwite - database config - update post function error: ",error);
            }
    }
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true;
            }
            catch(error){
                console.log("apprwite - database config - delete post function error: ",error);
                return false;
            }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            }
            catch(error){
                console.log("apprwite - database config - get post function error: ",error);
            }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try{
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            queries
        }
        catch(error){
            console.log("appwrite config - get posts function ",error)
        }

    }
    async uploadFile(file){
        try{
            return await this.storage.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("apprwite - database config - upload file function error: ",error);
        }
    }
    async deleteFile(fileId){
        try{
            return await this.storage.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
        }
        catch(error){
            console.log("apprwite - database config - delete file function error: ",error);

        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )
    }
    
}

const service = new Service()

export default service