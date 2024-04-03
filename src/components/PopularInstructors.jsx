import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
//
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const baseURL = 'http://127.0.0.1:8000/api';

function PopularInstructors(){
    const [popularteacherData, setpopularteacherData] = useState([]);
    useEffect(() => {
          //popular teachers
          try {
            axios.get(baseURL +'/popular-teachers/?popular=1')
            .then((res)=>{
              setpopularteacherData(res.data);
        })
        }catch (error) {
            console.log(error);
        }
    });
    
    return(
    <div className="container mt-3">
           {/*LATEST COURSES START */}
        <h3 className='pb-1 mb-4'style={{ textAlign:'center'}}>Popular Instructors:</h3>
        <div className='row'>
        {popularteacherData && popularteacherData.map((teacher, index)=>
        <div className='col-md-3'>
        <Card >
          <Card.Img variant="top" src={teacher.profile_img} alt={teacher.full_name} className="img-thumbnail" style={{ height: '200px' }} />
          <Card.Body className="text-center">
            <Card.Title>
              <Link to={`/instructor-detail/${teacher.id}`}style={{ textDecoration: 'none', textAlign:"center" }}>{teacher.full_name} </Link>
            </Card.Title>
            <Card.Text style={{ borderRadius: '10px', backgroundColor: 'grey' ,padding: '10px'  }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span>Total Courses: {teacher.total_teacher_courses}</span>
              </div>
            </Card.Text>
            <Button variant="secondary" className="w-100" >
              <Link to={`/instructor-detail/${teacher.id}`}style={{ textDecoration: 'none', color: "white"}}>Show Teacher Details</Link>
            </Button>
          </Card.Body>
        </Card>
        </div>
        )} 
        </div>
            {/*LATEST COURSES END */}
            {/* pagination */}
            <nav aria-label="Page navigation example mt-5">
            <ul className="pagination justify-content-center">
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
            </nav>
            {/*pagination end */}
    </div>
    );
}

export default PopularInstructors;