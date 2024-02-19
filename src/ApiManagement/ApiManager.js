import axios from 'axios'
const ApiManager = axios.create({
    baseURL:"http://192.168.10.110:8000",
    responseType:'json',
    withCredentials:'true'
})
export default ApiManager