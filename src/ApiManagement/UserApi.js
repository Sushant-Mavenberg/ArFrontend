import ApiManager from "./ApiManager";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Email_login = async(apiEndpoint,data)=>{
    console.log(apiEndpoint,data)
    try {
        const result = await ApiManager(apiEndpoint,{
            method:"post",
            headers:{
                "Content-Type":'application/json'
            },
            data
        });
        console.log(result,"result")
        return result

    } catch (error) {
       return error.response
    }
}

export const storeToken = async (token) => {
  console.log(token,"token")
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log('Error storing token:', error);
    }
  };