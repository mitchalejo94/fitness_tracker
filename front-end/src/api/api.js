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
        throw error;
    }
 }

 export const fetchUser = async (token) => {
    // console.log('token in fetchuser: ', token)
    try {
        const response = await fetch(`${URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            }).then(response => response.json());
            // console.log('this is fetch response: ', response);
            return response;
    } catch (error) {
        console.log('there was an error fetching the user: ', error);
        throw error;
    }
 }

 export const fetchRoutines = async(username, token) => {
    try {
        if (token) { 
            const response = await fetch(`${URL}/users/${username}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const routines = response.json();
            return routines;
        } else {
            const response = await fetch(`${URL}/users/${username}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const routines = response.json();
            return routines;
        }
    } catch (error) {
        console.log('there was an error fetching routines: ', error);
        throw error;
    }
 };

 // this function lets us make a new routine
 export const postRoutine = async(name, goal, visability, token) => {
    try {
        console.log('our info inside the post method: ', name, goal, visability, token)
        const gatheringData = await fetch(`${URL}/routines`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                    name: name,
                    goal: goal,
                    isPublic: visability
                })
        });
        const newRoutine = await gatheringData.json();
        console.log('our new routine: ', newRoutine)
        return newRoutine;
    } catch (error) {
        console.log('there was an erro creating a new routine: ', error);
        throw error;
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