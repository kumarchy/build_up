import React from 'react'

const Profile = () => {

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div>
      <p onClick={handleLogout}>LogOut</p>
    </div>
  )
}

export default Profile;