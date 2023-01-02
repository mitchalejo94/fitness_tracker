import react from "react";


const Home = ({token}) => {
    const getUserData = async (token) => {
        const data = await fetchUser(token);
        console.log('this is data in Home: ', data);
        return data;
    }
    // const data = await getUserData(token);
    // console.log('datadatadata: ', data)
    getUserData();
    return (
        <>
        <div className="ui container">
        <h1 className="centered ui header">Welcome Home</h1>
        {token ?
            // (`You are logged in as ${data.username}`)
            console.log('you are logged in')
        :
            (<p>You are not logged in.</p>)}
        </div>
        </>
    )
}



export default Home;