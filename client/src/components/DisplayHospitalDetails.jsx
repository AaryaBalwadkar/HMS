import React from 'react'

const DisplayHospitalDetails = ({name,images}) => {
  return (
    <div className='w-[50vw] h-[50vh]'>
      {name}
      <div>{images}</div>
    </div>
  )
}

export default DisplayHospitalDetails
