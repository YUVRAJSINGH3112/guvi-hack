import React, { useEffect,useState } from 'react'
import axios from 'axios'

const AdminDashboard = () => {
  const [feedback,setFeedback]=useState([]);
  useEffect(()=>{
      const getfeedback=async()=>{
        const response=await axios.get('http://localhost:3000/feedback/getFeedback')
        console.log(response);
        setFeedback(response)
      }
      getfeedback();
  },[])
  return (
    <div className='flex justify-evenly items-center'>

      <div className='flex-grow h-full'>

      </div>
    </div>
  )
}

export default AdminDashboard
