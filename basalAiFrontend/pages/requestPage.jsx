
import "./pageCss/requestPage.css"
import {JobPotalContext} from "../context/contextApi"
import { useContext } from "react";
import { Loading } from "../components/loading";



export const RequestPage =() =>{

    const {requests} =  useContext(JobPotalContext) ;

    console.log(requests[0])

    if (requests.length===0){
        return(
            <>
                <Loading/>
            </>
        )
    }

    return(
        <div className="request-main-cont">
            <div className="request-cont">
                <div>
                    <h1>Interview Requests</h1>
                </div>
                {requests.map((request)=>(
                    <div className="request-card" key={request._id}>
                        <h1>{request.name}</h1>
                        <p>{request.email}</p>
                        <a href={request.resumeLink}>Resume</a>
                        <div className="rqst-btn">
                            <button>Accept</button>
                            <button>Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}