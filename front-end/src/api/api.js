// const { post } = require("../../../api/routines");

 const URL = "https://fitnesstrac-kr.herokuapp.com/api";

//  const makeHeaders = (token)=>{
//     const headers = {
//         "Content-Type":"application/json"
//     }
//     if(token){
//         headers["Authorization"] = `Bearer ${token}`
//     }
//     return headers
//  }

//  const callAPI = async (endpointPath, defaultOptions = {}) =>{
//     const {token, method, body} = defaultOptions;
    
//     const options = {
//         headers: makeHeaders(token)
//     }
//     if(method){
//         options.method = method 
//     }
//     if(body){
//         options.body = JSON.stringify(body)   
//     }
//     const response = await fetch (`${URL}${endpointPath}`, options)
//     const result = await response.json()

//     return result
//  }

 export const fetchActivities = async() => {
    try {
        const response = await fetch(`${URL}/activities`, {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(response => response.json()) 
            return response
    } catch ( error) {
        console.error ("There was an error fetching the activities", error)
    }
 };

 /* export const createActivity = async(name, description, token) => {
    try {
        const response = await fetch(`${URL}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
            })
        })
        const result = await response.json()
        console.log("result.....", result)
        return result
    } catch ( error) {
        console.error ("There was an error creating the activity", error)
    }

    */


 
 export const registerUser = async (username, password) => {
    try{
        const response = await fetch(`${URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
            })
        })
        const result = await response.json()
        console.log("result.....", result)
        return result
    }catch(error) {
        console.error("There was an error registering the user", error)
    }
 }

 export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
            })
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.error("There was an error logging in the user", error)
    }
 }

//  export const fetchActivities = async ()=>{
//     try{
//         const {success, error, activities } = await callAPI ('/activities',{
//             token:token
//         })
//         if(success){
//             return{
//                 error:null,
//                 posts: activities
//             }
//         }else{
//             return{
//                 error:error.message,
//                 posts:[]
//             }
//         }
//     }catch(error){
//         console.error("Error fetching activities", error);

//         return{
//             error: 'Failed to load activities',
//             posts: []

//         }
//     }
//  }
export default loginUser