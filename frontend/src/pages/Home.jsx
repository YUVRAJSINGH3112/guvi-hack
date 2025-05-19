import React,{useState,useEffect} from 'react'
import RecentEvent from '../components/RecentEvent';
import Feedback from '../components/FeedBack';
const Home = () => {
  const [user, setUser] =useState(null)
  useEffect(() => {
    fetch('https://guvi-hack.onrender.com/user/profile')
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));
      console.log(user)
    }, []);
  return (
    <div className='mt-16 px-40 py-10'>
      <div>
        <h1 className='text-4xl font-bold text-gray-900'>Welcome back!!</h1>
        <p className='mt-4 text-lg text-gray-700'>Shape the change, one feedback at a time</p>
      </div>
       <div>
        <div className='mt-4 w-full'>
          <RecentEvent/>
          <div className='flex justify-evenly items-center'>
            <Feedback/>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Home
