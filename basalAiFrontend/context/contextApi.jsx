import React, { createContext,  useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";



import notofication from "../src/assets/notofication.mp3"

export const JobPotalContext = createContext();

const baseUrl  = "https://basalai-20g5.onrender.com" ;

const socket = io(baseUrl); 


export const JobPortalContextProvider = ({ children }) => {
 
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [opening , setOpening] = useState([]);
  const [requests, setRequests] = useState([]);
  const [role ,setRole] =useState(localStorage.getItem("role") || "candidate");



  
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






    useEffect(()=>{
      try {
        const handleNewRequest =async () => {
          console.log("New request received!");

          const audio = new Audio(notofication);
          audio.play();

          const res = await axios.get(`${baseUrl}/application/interview-requests`);
          setRequests(res.data);
        };
        socket.on("newInterViewRequestCreated" , handleNewRequest)
       
    
        } catch (error) {
            console.log("Error on fetching requests")
        }

        return ()=>{socket.off("interviewRequestReceived")};
    },[])


    useEffect(()=>{
      const fetchRequests = async () => {
        const res = await axios.get(`${baseUrl}/application/interview-requests`);
        setRequests(res.data);
      };

      fetchRequests()
    },[])

 



  const register = async (formData) => {
    await axios.post( `${baseUrl}/users/register` , formData);
  };




  const signIn = async (credentialsData ,navigate) => {
    try {
    const res = await axios.post(`${baseUrl}/users/signin`, credentialsData);

      if (res.status === 200) {
        const { token, user ,role  } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role",role  );
        alert("Signin Successful!");
        setToken(token);
        setUser(user);
        setRole(role)
        navigate("/")
      }

    } catch (error) {
      
      if (error.response && error.response.status === 401) {
        alert("Signin failed: Invalid credentials");
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    }
      
  };




  const submitRequest = async (data ,id) => {
     try {
        await axios.post(`${baseUrl}/application/interview-requests/add/${id}`, data);
        fetchRequests();
    } catch (err) {
        console.error("Error while submitting:", err);
    }
  };

 
  const fetchRequests = async () => {
    const res = await axios.get(`${baseUrl}/application/interview-requests`);
    setRequests(res.data);
  };

  
  const acceptRequest = async (id) => {
    await axios.put(`${baseUrl}/interview-requests/${id}/accept`);
    fetchRequests();
  };

  

  return (
    <JobPotalContext.Provider value={{ user, token, setToken, requests,role , register,opening,  signIn, submitRequest, fetchRequests, acceptRequest}}>
      {children}
    </JobPotalContext.Provider>
  );
};
