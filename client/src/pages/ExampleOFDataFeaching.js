import React from 'react'
const Dashboard = () =>{
    
    /*********Example of fetch data from backend to frontend ***************/
    /* const fetchData = async() =>{
        try{
            // const response =await fetch('/data.json') // fetching data from front-end server
            // const response = await fetch('http://localhost:5000/')  //fetching data rom back-end server//When we using [CORS] for data fetching
            const response = await fetch('/api')  //fetching data rom back-end server//When we using [proxy] for data fetching
            const data = await response.json()
            console.log(data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
*/

    return <h1>Dashboard</h1>
}
