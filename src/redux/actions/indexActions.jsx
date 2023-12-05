import axios from "axios";
const category_route = 'http://localhost:8080/api/v1/category';
const product_route = 'http://localhost:8080/api/v1/product';
const auth_route = 'http://localhost:8080/api/v1/auth';
const user_route = 'http://localhost:8080/api/v1/admin/user'

export const getAllProducts=()=> async  (dispatch)=> {
    try{
        let response = await axios.get("http://localhost:8080/api/v1/product/list");
        console.log(response.data)
        return dispatch({
        type: "GET_ALL_PRODUCTS",
        payload: response.data,
        });
    }catch(error){
        console.log(error);
    }
};


export const filterByCategories=(payload)=> {
    return {
        type: "FILTER_BY_CATEGORIES",
        payload,
    };
}

export const getAllCategories=() =>async (dispatch)=>{
    try{
        let response = await axios.get(`${category_route}/list`);
        return dispatch({
        type: "GET_ALL_CATEGORIES",
        payload: response.data,
        });
    }catch(error){
        console.log(error);
    }
};

export const getProductsByName=(name) =>async (dispatch)=>{
    try{
        let response = await axios.get(`${product_route}/find/${name}`);
        return dispatch({
        type: "GET_PRODUCTS_BY_NAME",
        payload: response.data,
        });
    }catch(error){
        console.log(error);
    }
};

export const sendEmail=(email) =>async(dispatch)=>{
    try{
        let response = await axios.get(`${auth_route}/email/${email}`);
        return dispatch({
            type: "",
            payload: response.data
        })
    }catch{
        console.log("error")
    }
}

export const resetPassword=(payload)=>async(dispatch)=>{
    try{
        let response = await axios.put(`${auth_route}/newpassword`, payload)
        return dispatch({
            type: "",
            payload: response.data
        })
    }catch{
        console.log("error")
    }
}

export const logout=()=>async(dispatch)=>{
    try{
        let response = await axios.post(`${product_route}/logout`)
        localStorage.removeItem("token")
        return dispatch({
            type: "LOGOUT"
        })
    }catch{
        console.log("error")
    }
}

export const login=(payload)=>async(dispatch)=>{
    try{
        let response = await axios.post(`${auth_route}/login`, payload, {headers: {'Content-Type': 'application/json',},})
        console.log(response.data.token)
        localStorage.setItem('token',response.data.token)
        return dispatch({
            type: "LOGIN"
        })
    }catch{
        console.log("error")
    }
}