import "./pageCss/candidatePage.css"

import { useContext, useEffect, useRef, useState } from "react"

import {JobPotalContext} from "../context/contextApi"
import { Loading } from "../components/loading";


export const CandidatePage =() =>{
    const {opening ,submitRequest } = useContext(JobPotalContext);
    const [isOpen , setIsOpen]=useState(false)
    const isOpenRef = useRef();

    const [formData , setFormData] =useState({name:"" , email:"" , resumeLink :""})
    const [jobOpeningId , setJobOpeningId] = useState();


    useEffect(()=>{
        function handleOutsideClick (e){
            if (isOpenRef.current && !isOpenRef.current.contains(e.target)){
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown" ,handleOutsideClick)

        return ()=>{document.removeEventListener("mousedown" ,handleOutsideClick)}

    },[isOpen])



    if (opening.length===0){
        return(
            <>
                <Loading/>
            </>
        )
    }

    const handleApply =(e,id)=>{
        setJobOpeningId(id)
        setIsOpen(true)
    }




    const handleSubmitForm =(e)=>{
        e.preventDefault();
        for (let key in formData){
            if(!formData[key]){
                alert(`please fill the ${key.replace("_" ,"")}`)
                return
            }

        }

        submitRequest(formData , jobOpeningId)
        setFormData({name:"" , email:"" , resumeLink :""})
        setJobOpeningId()
        setIsOpen(false)
    }


    const handleFormChange =(e) =>{
        const {name , value} =e.target ;
        setFormData((prev)=>({
            ...prev , [name]:value
        }))
    }

    

    return(
        <div id="candidate">
            <div className="candidate-cont">
                {opening.map((job)=>(
                    <div className="card" key={job._id}>
                        <h1>{job.title}</h1>
                        <p>{job.description}</p>
                        <p>{job.isActive ? 'Open' : 'Closed'}</p>
                        <button onClick={(e)=>handleApply(e, job._id) } disabled={job.isActive===false}  className={job.isActive ? 'apply-btn' : 'closed-btn'} >{job.isActive ? 'Apply' : 'Closed'}</button>
                    </div>
                ))}
            </div>

            {isOpen && (
                <div className="form-modal">
                    <div className="form-modal-content" ref={isOpenRef}>
                        <form className="form">
                            <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="name" />
                            <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="email" />
                            <input type="text" name="resumeLink" value={formData.resumeLink} onChange={handleFormChange}  placeholder="resumeLink" />
                            <button onClick={handleSubmitForm} >Submit</button>
                        </form>
                        <button onClick={() => setIsOpen(false)}>Close</button>
                    </div>
            </div>
            )}
        </div>
    )
}