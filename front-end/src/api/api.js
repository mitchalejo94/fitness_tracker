 const URL = "https://fitnesstrac-kr.herokuapp.com/";

 const makeHeaders = (token)=>{
    const headers = {
        "Content-Type":"application/json"
    }
    if(token){
        headers["Authorization"] = `Bearer ${token}`
    }
    return headers
 }

 const callAPI = async (endpointPath, defaultOptions = {}) =>{
    const {token, method, body} = defaultOptions;
    
    const options = {
        headers: makeHeaders(token)
    }
    if(method){
        options.method = method 
    }
    if(body){
        options.body = JSON.stringify(body)   
    }
    const response = await fetch (`${URL}${endpointPath}`, options)
    const result = await response.json()

    return result
 }