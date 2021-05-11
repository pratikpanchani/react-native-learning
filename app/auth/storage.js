import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken"

const storeToken = async authToken => {
    try {
        await SecureStore.setItemAsync(key, authToken);
    } catch (error) {
        console.log("Error storing the authToken")
    }
}

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch(error) {
        console.log("Error getting authToken")
    }
}

const getUser = async () => {
    const token = await getToken();
    if(token) {
       return jwtDecode(token);
    } else {
        return null;
    }
}

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log('Error removing the auth token')
    }
}

export default {
    removeToken,
    storeToken,
    getUser,
    getToken
}
