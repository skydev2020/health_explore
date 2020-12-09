import { useSelector, useDispatch } from 'react-redux'
import { setSorts } from '../store/jobs.action'
import JobItemComponent from './JobItemComponent';

const SORT_FIELDS = {
    'Location': 'location',
    'Role': 'job_title',
    'Department': 'department',
    'Date': 'created'
}

export default function Jobs() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)  
    const { query, jobs } = state.jobs

    const handleSort = (type) => {
        if (!query.sort[type]) {
            query.sort[type] = 'asc';
        } else if (query.sort[type] === 'asc') {
            query.sort[type] = 'desc';
        } else {
            delete query.sort[type];
        }
        
        dispatch(setSorts(query.sort))
    }   

    return (
        <>
            <div className="w-3/4 w-full flex flex-col min-h-screen h-full">
                <div className="flex flex-col ">
                    <div className="bg-white min-h-screen h-auto flex flex-col w-full">
                        <div className="sortby-wrap">
                            <div className="mt-2">
                                <span className="font-bold">{jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0)}</span> job postings
                            </div>
                            <div className="hidden lg:flex lg:space-x-4 pt-2 lg:flex-row flex-col">
                                <h4 className="font-semibold text-gray-500 flex-col">Sort by</h4>
                                <div className="flex lg:pt-0 pt-2 space-x-4 item-start">
                                    {Object.keys(SORT_FIELDS).map((field, index) => {
                                        return (
                                            <p className="capitalize cursor-pointer" key={index} onClick={()=>handleSort(SORT_FIELDS[field])}>
                                                {field}
                                                {query.sort[SORT_FIELDS[field]] && 
                                                    <>
                                                        {query.sort[SORT_FIELDS[field]] === 'desc' ? 
                                                            <img className="ml-1 mr-1 sort-icon" src="https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/3cfbcdaff9818c3e2c07d755d556fe1f34d7cf0d/black/svg/arrow-up.svg" aria-hidden="true" /> :
                                                            <img className="ml-1 mr-1 sort-icon" src="https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/3cfbcdaff9818c3e2c07d755d556fe1f34d7cf0d/black/svg/arrow-down.svg" aria-hidden="true" />
                                                        }
                                                    </>
                                                }
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <ul className="joblisting">
                            { jobs.map((job, index) => <JobItemComponent key={index} job={job} />) }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}