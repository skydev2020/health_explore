import { useState } from 'react'

export default function JobItem ({job}) {
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailItem, setDetailItem] = useState(-1);

    return (
        <li className="job-item">
            <div className="w-full space-x-4 flex cursor-pointer" onClick={()=>setDetailOpen(!detailOpen)}>
                <p className="uppercase text-white w-9 h-9 text-sm font-semibold flex bg-gray-400 justify-center items-center rounded-md">{job.name.substr(0, 2)}</p>
                <p className="text-gray-500 mt-1">{`${job.total_jobs_in_hospital} jobs for ${job.name}`}</p>
            </div>
            { detailOpen && <ul className="w-full mt-3 flex flex-col">
                { job.items.map( (detail, index) => {
                    return (
                        <li className="job-lists cursor-pointer" key={index} onClick={()=> setDetailItem(detailItem == index ? -1 : index)}>
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <h4 className="font-bold">{detail.job_title}</h4>
                                    <p>
                                        {`${detail.job_type} | $${detail.salary_range[0]} ~ $${detail.salary_range[1]}  an hour | ${detail.city}`}
                                    </p>
                                </div>
                                <div><p className="text-gray-600">4 weeks ago</p></div>
                            </div>
                            { (detailItem === index) && 
                                <div className="job-details-wrap flex lg:flex-row flex-col py-4 w-full px-2 md:px-4 rounded shadow mt-2">
                                    <div className="flex flex-col lg:w-2/3 items-start py-1">
                                        <div className="flex flex-row mb-4 w-full items-start flex-wrap">
                                            <h4 className="font-semibold w-full md:w-1/2">Department:</h4>
                                            <p className="w-full md:w-1/2">
                                                {detail.department.map(dep => { return dep+', ' })}
                                            </p>
                                        </div>
                                        <div className="flex flex-row mb-4 w-full items-start flex-wrap">
                                            <h4 className="font-semibold w-full md:w-1/2">Hours/Shifts:</h4>
                                            <p className="w-full md:w-1/2">
                                                {`${detail.hours[0]} hours / ${detail.work_schedule}`}                                                
                                            </p>
                                        </div>
                                        <div className="flex flex-row mb-4 w-full items-start flex-wrap">
                                            <h4 className="font-semibold w-full md:w-1/2">Summary:</h4>
                                            <p className="w-full md:w-1/2">
                                                {detail.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row lg:flex-col lg:items-end items-start lg:w-1/3 lg:space-y-2 space-x-2">
                                        <button className="hidden lg:flex btn-blue p-2 rounded-lg border-opacity-100 text-opacity-100 text-sm">Job Details</button>
                                        <button className="hidden lg:flex btn-blue-outline p-1 border-2 rounded-lg border-opacity-100 text-opacity-100 text-sm">Save Job</button>
                                    </div>
                                </div>
                            }                            
                        </li>
                    )
                })}
            </ul>}            
        </li>
    )
}