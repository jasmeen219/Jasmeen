import axios from "axios"

const baseUrl ="http://localhost:4001/api"


export default new class ApiServices{
    login(data){
        return axios.post(baseUrl+"/user/login", data)
    }
    
    CustomerRegister(data){
        return axios.post(baseUrl +"/customer/add", data)

    }
    getAllUsers(data){
        return axios.post(baseUrl +"/customer/all", data)
        
    }
    getAllVendors(data){
        return axios.post(baseUrl +"/vendor/all", data)
        
    }
    CustomerStatus(data){
        return axios.post(baseUrl +"/customer/DeleteSingle", data)

    }

}