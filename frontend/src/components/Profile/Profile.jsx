import React from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signup");
  };

  return (
    <div className='flex flex-col gap-2 p-2'>
      <p className='cursor-pointer' onClick={handleSignIn}>SignIn</p>
      <hr />
      <p>LogOut</p>
    </div>
  )
}

export default Profile;