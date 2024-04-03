import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';

const baseURL = 'http://127.0.0.1:8000/api';

function Sidebar() {
  const[notifData, setnotifData] = useState([]);
  const studentId = localStorage.getItem('studentId');
  useEffect(() => {
    try{
      axios.get(baseURL+'/student/fetch-all-notifications/'+studentId+'/')
      .then(res=>{
          setnotifData(res.data);
      });
    }catch(error){
      console.log(error);
    }
  }, []);
  return (
    <div class="card mb-2">
    <h5 className="card-header">Dashboard</h5>
        <div className="list-group list-group-flush">
            <Link to="/user-dashboard" className="list-group-item list-group-item-action bg-warning"  style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Dashboard</Link>
            <Link to="/my-courses" className="list-group-item list-group-item-action bg-info"  style={{ fontSize: '1.2em', fontWeight: 'bold' }}>My Courses</Link>
            <Link to="/my-assignments" className="list-group-item list-group-item-action bg-info"  style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Assignments<span className='float-end badge bg-danger'>{notifData.length}</span></Link>
            <Link to="/favorite-courses" className="list-group-item list-group-item-action bg-info"  style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Favorite Courses</Link>
            <Link to="/recommended-courses" className="list-group-item list-group-item-action bg-info"  style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Recommended Courses</Link>
            <Link to="/profile-setting" className="list-group-item list-group-item-action bg-info"  style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Profile Settings</Link>
            <Link to="/change-password" className="list-group-item list-group-item-action bg-info"  style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Change Password</Link>
            <Link to="/user-logout" className="list-group-item list-group-item-action text-dark bg-danger"  style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Logout<i class="bi bi-box-arrow-in-right"></i></Link>
        </div>
    </div>
  )
}

export default Sidebar
