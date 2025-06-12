

import "./pageCss/companyPage.css"
import {JobPotalContext} from "../context/contextApi" ;
import { useContext } from "react";
import { Loading } from "../components/loading";




export const  CompanyPage =()=>{
    const  {opening}= useContext(JobPotalContext) ;
    

    if (opening.length===0){
            return(
                <>
                    <Loading/>
                </>
            )
    }


    
    return(
        <div id="company">
            <div>
                <h1>For Recruiter</h1>
            </div>
            <div className="company-cont">
                {opening.map((job)=>(
                    <div className="company-card" key={job._id}>
                        <h1>{job.title}</h1>
                        <p>{job.description}</p>
                        <p>{job.isActive ? 'Open' : 'Closed'}</p>
                        <button onClick={(e)=>handleApply(e, job._id) }  className="apply-btn" >View Candidates</button>
                    </div>
                ))}
            </div>

            
        </div>
    )
}