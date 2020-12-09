import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilters } from '../store/jobs.action'

export default function Filters({filters}) {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)  
    const { query } = state.jobs
    const [showModal, setShowModal] = useState(false);

    const filterData = (type, value) => {
        if ( !query.filters[type]) {
            query.filters[type] = [];
        }
        if ( query.filters[type].indexOf(value) === -1) {
            if (type !== 'department') 
                query.filters[type] = [];
            query.filters[type].push(value);
        } else {
            let tmp = [];
            for (let v of query.filters[type]) {
                if (v === value) continue;
                tmp.push(v);
            }
            query.filters[type] = tmp;
        }
        Object.keys(query.filters).map( filter => {
            if (query.filters[filter].length === 0) {
                delete query.filters[filter];
            }
        })
        dispatch(setFilters(query.filters));
    }

    return (
        <>
            <div className="w-1/4 hidden filterWrap lg:block space-y-4">
                { Object.keys(filters).map((filter, index) => {
                    return (
                        <div className="bg-white lg:p-6 p-4" key={index}>
                            <h3 className="font-bold uppercase mb-4">{filters[filter][0].title}</h3>
                            { filters[filter].slice(0,10).map( (item, idx) => 
                                <div className={`flex mb-3  ${query.filters[filter] && query.filters[filter].indexOf(item.key) >= 0 ? 'text-blue-500':''} cursor-pointer`} key={idx} onClick={() => filterData(filter, item.key)}>
                                    <p className="flex text-sm">
                                        {item.key}
                                        <span className="text-xs text-gray-400 mt-0.5 ml-10 self-end">{item.doc_count}</span>
                                    </p>
                                </div>
                            ) }
                            { filters[filter].length > 10 &&
                                <button  className="text-blue-500 show-modal text-sm" onClick={()=>setShowModal(filter)}>Show more</button>
                            }
                        </div>
                    );
                })}
            </div>
            { showModal !== false && 
            <div className="bg-black-opacity flex modal-wrap">
                <div className="w-3/4">
                    <div className="border-0 shadow-lg modal-inwrap bg-white">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300">
                            <h3 className="text-lg font-semibold capitalize ml-3">{showModal}</h3>
                            <button className="p-1 ml-auto close-modal bg-transparent border-0" onClick={()=>setShowModal(false)}>
                                <svg height="15px" viewBox="0 0 329.26933 329" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>
                            </button>
                        </div>
                        <div className="flex flex-wrap p-6">
                            { filters[showModal].map( (item, idx) => 
                                <div className={`flex justify-between w-full lg:w-1/4 p-1.5 pr-10 ${query.filters[showModal] && query.filters[showModal].indexOf(item.key) >= 0 ? 'text-blue-500':''}`} key={idx} style={{cursor: 'pointer'}} onClick={() => filterData(showModal, item.key)}>
                                    <p className="text-sm">{item.key}</p>
                                    <p className="text-gray-400">{item.doc_count}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}