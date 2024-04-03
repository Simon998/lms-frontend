
//bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
//
import { Link } from 'react-router-dom';
//


import axios from 'axios';
import React, { useState, useEffect } from 'react';

const baseURL = 'http://127.0.0.1:8000/api';

function Home() {
  useEffect(() => {
    document.title = 'Lms | Home';
});
const [courseData, setCourseData] = useState([]);
const [popularcourseData, setpopularcourseData] = useState([]);
const [popularteacherData, setpopularteacherData] = useState([]);



     //fetch courses
     useEffect(() => {
        try {
            axios.get(baseURL +'/course/?result=4')
            .then((res)=>{
                setCourseData(res.data.results);
        })
        }catch (error) {
            console.log(error);
        }
        //popular courses
        try {
          axios.get(baseURL +'/popular-courses/?popular=1')
          .then((res)=>{
            setpopularcourseData(res.data);
      })
      }catch (error) {
          console.log(error);
      }
        //popular teachers
        try {
          axios.get(baseURL +'/popular-teachers/?popular=1')
          .then((res)=>{
            setpopularteacherData(res.data);
      })
      }catch (error) {
          console.log(error);
      }
        
    },[]);

  return (
    <>
    
    <div className='container mt-4'>
      {/*LATEST COURSES START */}
    <h3 className='pb-1 mb-4'>Latest Courses:
      <div style={{ float: 'right' }}>
        <Button variant="primary">
          <Link to='/all-courses' style={{ textDecoration: 'none', color: "white" }}>See All</Link>
        </Button>
      </div>
    </h3>
      <div className='row'>
      <div className='row mb-4'>
            {courseData && courseData.map((course, index)=>  
                <div className='col-md-3 mb-4' key={index}>
                    <Card className="h-150">
                        <div>
                            <Card.Img variant="top" src={course.featured_image} className="img-thumbnail" style={{ height: '200px' }}/>
                        </div>
                        <Card.Body className="text-center d-flex flex-column">
                            <Card.Title>
                                <Link to="/detail/1" style={{ textDecoration: 'none', textAlign:"center" }}>{course.title}</Link>
                            </Card.Title>
                             
                            <Card.Text style={{ borderRadius: '10px', backgroundColor: 'grey' ,padding: '10px'  }}>
                            <span>Rating: </span>
                            </Card.Text>
                            
                            <Button variant="secondary" className="mt-auto">
                                <Link to={`/detail/${course.id}`}style={{ textDecoration: 'none', color: "white"}}>Show Details</Link>
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
                )}
             </div>
      </div>
       {/*LATEST COURSES END */}
       {/*POPULAR COURSES START */}
      <h3 className='pb-1 my-4'>Popular Courses:
      <div style={{ float: 'right' }}>
        <Button variant="primary">
          <Link to='/popular-courses' style={{ textDecoration: 'none', color: "white" }}>See All</Link>
        </Button>
      </div>
      </h3>
      <div className='row'>
        {popularcourseData && popularcourseData.map((row, index)=>
        <div className='col-md-3'>
        <Card >
          <Card.Img variant="top" src={row.course.featured_image}  className="img-thumbnail" style={{ height: '200px' }}/>
          <Card.Body className="text-center">
            <Card.Title>
              <Link to={`/detail/${row.course.id}`} style={{ textDecoration: 'none', textAlign:"center" }}>{row.course.title}</Link>
            </Card.Title>
            <Card.Text style={{ borderRadius: '10px', backgroundColor: 'grey' ,padding: '10px'  }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Rating: {row.rating}/5</span>
                <span>Views: {row.course.course_views}</span>
              </div>
            </Card.Text>
            <Button variant="secondary" className="w-100">
              <Link to={`/detail/${row.course.id}`} style={{ textDecoration: 'none', color: "white"}}>Show Details</Link>
            </Button>
          </Card.Body>
        </Card>
        </div>
        )}
      </div>
       {/*POPULAR COURSES END */}
       {/*POPULAR TEACHERS START */}
      <h3 className='pb-1 my-4 mb-4'>Poular Teachers:
      <div style={{ float: 'right' }}>
        <Button variant="primary">
          <Link to='/popular-instructors' style={{ textDecoration: 'none', color: "white" }}>See All</Link>
        </Button>
      </div>
      </h3>
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
       {/*POPULAR TEACHERS END */}
       {/*STUDENT TESTIMONIES START */}
      
       {/*STUDENT TESTIMONIES END */}
    </div>
    
  </>
  );
}

export default Home
