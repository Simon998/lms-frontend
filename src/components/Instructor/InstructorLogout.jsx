import React from 'react'

function InstructorLogout() {
    localStorage.removeItem('teacherLoginStatus')
    window.location.href = '/instructor-login';
  return (
    <div>
      
    </div>
  )
}

export default InstructorLogout
