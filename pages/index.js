import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setKeyword } from '../store/jobs.action'
import { Filters, Jobs } from '../components';
import axios from 'axios'

const Home = ({filters}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)  
  const { query } = state.jobs
  useEffect(() => {
    dispatch(setKeyword(''))
  }, []);

  return (
    <div className="bg-gray-100 p-1">
      <div className="flex flex-col m-3">
          <input type="search" className="bg-white shadow border-0 h-10 pt-0.5 pb-0.5 pl-10 pr-3" placeholder="Search for any job, title, keywords or company" value={query.keyword} onChange={(e)=>dispatch(setKeyword(e.target.value))}/>
          <div className="absolute pl-2 pr-1 w-8 mt-2.5">
              <img src="https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-search-thin.png" />
          </div>
      </div>
      <div className="flex sidebarContainer m-3 lg:space-x-4">
          <Filters filters={filters} />
          <Jobs />
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  let data = await axios.get(`${process.env.BASE_URL}/api/filters`).then(response => {
    return response.data;
  });
  return {
    props: { 
      filters: data    
    }
  }
};

export default Home;