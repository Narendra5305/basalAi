import React, { createContext,  useState, useEffect } from "react";
import axios from "axios";


export const JobPotalContext = createContext();


const baseUrl  = "http://localhost:8080" ;


export const JobPortalContextProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [opening , setOpening] = useState([]);
  const [requests, setRequests] = useState([]);


  
  useEffect(() => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
        delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);



    useEffect(()=>{
        try {
            const fecthData = async () =>{
                const res = await axios.get( `${baseUrl}/opening/`);
                setOpening(res.data.openings)
            }
            fecthData()
        } catch (error) {
            console.log("Error on fetching opening")
        }
    },[])

 

  const register = async (formData) => {
    await axios.post( `${baseUrl}/users/register` , formData);
  };




  const signIn = async (credentialsData) => {
    const res = await axios.post(`${baseUrl}/users/signin`, credentialsData);
    if (res.status===200){
         const { token, user } = res.data;
        localStorage.setItem("token", token);
        setToken(token);
        setUser(user);
        alert("Signin Successfull!")
    }else{
        alert("Signin fail!")
    }
  };




  const submitRequest = async (data ,id) => {
    console.log(data,id)
    await axios.post( `${baseUrl}/application/interview-requests/add/${id}` , data);
    fetchRequests();
  };

 
  const fetchRequests = async () => {
    const res = await axios.get(`${baseUrl}/interview-requests`);
    setRequests(res.data);
  };

  
  const acceptRequest = async (id) => {
    await axios.put(`${baseUrl}/interview-requests/${id}/accept`);
    fetchRequests();
  };



  return (
    <JobPotalContext.Provider value={{ user, token, requests, register,opening,  signIn, submitRequest, fetchRequests, acceptRequest}}>
      {children}
    </JobPotalContext.Provider>
  );
};
