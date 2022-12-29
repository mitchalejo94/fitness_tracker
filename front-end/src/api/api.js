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

