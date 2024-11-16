const environment_variables = {
    appwriteURL : import.meta.env.VITE_APPWRITE_ENDPOINT,
    appwrieProjectId : import.meta.env.VITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_DATABASE_ID,
    appwriteCollectionId : import.meta.env.VITE_COLLECTION_ID,
    appwriteBucketId : import.meta.env.VITE_BUCKET_ID,
};

export default environment_variables ;