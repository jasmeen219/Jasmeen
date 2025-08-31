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

    AddMenu(data) {
        return axios.post(baseUrl + "/menu/add", data)

    }

    getMenus(data) {
        return axios.post(baseUrl + "/menu/all", data)

    }
    deleteMenu(data) {
        return axios.post(baseUrl + "/menu/DeleteSingle", data)

    }
    SingleMenu(data) {
        return axios.post(baseUrl + "/menu/single", data)

    }
    UpdateMenu(data) {
        return axios.post(baseUrl + "/menu/UpdateSingle", data)

    }
    addorder(data) {
        return axios.post(baseUrl + "/order/add", data)

    }
    viewOrder(data) {
        return axios.post(baseUrl + "/order/all", data)

    }

}