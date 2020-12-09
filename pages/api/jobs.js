// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jslinq from 'jslinq';

import jobs from '../../data/jobs.json';

export default async function getJobs(req, res) {
  let query = {
    keyword: '',
    filters: {},
    sort: {},
    ...req.body
  };
  
  res.statusCode = 200;

  let results = [];
  jobs.map(job => {

    let found = jslinq(job.items).where(el => {
      let matched = true;
      let values = jslinq(Object.values(el));
      if (query.keyword) {
        matched &= values.where(v => {
          if (typeof v === 'string') {
            return v.indexOf(query.keyword) !== -1 || v.toLowerCase().indexOf(query.keyword) !== -1 || v.toUpperCase().indexOf(query.keyword) !== -1;
          }
          return false;
        }).count();
      }

      Object.keys(query.filters).map( filter => {
        if ( query.filters[filter].length !== 1 ) {
          matched &= (jslinq(el[filter]).intersect(query.filters[filter]).count() === query.filters[filter].length);
        } else {
          matched &= (el[filter] === query.filters[filter][0]);
        }
      })

      return matched;

    });

    const sortFunc = (el, s) => {
      let coordiate = el[s].split(',');
      return coordiate[0];
    }

    Object.keys(query.sort).map(s => {
      if (query.sort[s] === 'asc') {
        found = found.orderBy(el => sortFunc(el, s));
      } else {
        found = found.orderByDescending(el => sortFunc(el, s));
      }
    });

    if (found.count()) {      
      results.push({
        ...job,        
        total_jobs_in_hospital: found.count(),
        items: found.toList()
      })
    }    
  });
  
  return res.json(results);
}