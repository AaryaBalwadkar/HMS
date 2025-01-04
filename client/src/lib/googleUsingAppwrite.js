import { Client, Account } from "appwrite";

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('676e31e20039f9f91a29'); // Replace with your Appwrite project ID

export const account = new Account(client);

export const authWithGoogle = async () => {
    let user = null
    await account.createOAuth2Session(
        'google',
        'http://localhost:5173/home',
        'http://localhost:5173/fail'
    )
        .then((result) => {
            user = result.user
        })
        .catch((err) => {
            console.log(err)
        })

    return user
}
