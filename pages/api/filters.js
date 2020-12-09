import jobs from '../../data/jobs';

export default async (req, res) => {
  res.statusCode = 200;
  
  let jobAllCounts = 0;
  // filter
  let jobTypes = []
  let workSchedules = []
  let experiences = []
  let departments = []

  jobs.map(hospital =>{
    jobAllCounts += hospital.items.length
    hospital.items.map(item =>{
      // check job exist in jobTypes array or not
      // job_type
      let existingState = false
      jobTypes.some((type, index) =>{
        if (type.key === item.job_type){
          existingState = true
          jobTypes[index].doc_count++
          return true
        }
      })
      if (!existingState){
        jobTypes.push({
          key : item.job_type,
          doc_count : 1,
          title : 'JOB TYPE'
        })
      }
      // work_schedule
      existingState = false
      workSchedules.some((schedule, index) =>{
        if (schedule.key === item.work_schedule){
          existingState = true
          workSchedules[index].doc_count++
          return true
        }
      })
      if (!existingState){
        workSchedules.push({
          key : item.work_schedule,
          doc_count : 1,
          title : 'WORK SCHEDULE'
        })
      }
      // experience
      existingState = false
      experiences.some((experience, index) =>{
        if (experience.key === item.experience){
          existingState = true
          experiences[index].doc_count++
          return true
        }
      })
      if (!existingState){
        experiences.push({
          key : item.experience,
          doc_count : 1,
          title : 'EXPERIENCE'
        })
      }
      // department
      item.department.map(_department =>{
        existingState = false
        departments.some((department, index) =>{
          if (department.key === _department){
            existingState = true
            departments[index].doc_count++
            return true
          }
        })
        if (!existingState){
          departments.push({
            key : _department,
            doc_count : 1,
            title : 'DEPARTMENT'
          })
        }
      })
    })
  })
  res.json({
      job_type : jobTypes,
      department: departments,
      work_schedule : workSchedules,
      experience: experiences
  })
}
