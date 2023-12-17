import { ID, Account, Client, Databases } from 'appwrite'
const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID: string = '657ae4d8503eba6daf36';

appwriteClient
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)

export const account = new Account(appwriteClient);

export const db = new Databases(appwriteClient);

export { ID } from 'appwrite';