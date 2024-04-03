import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const baseURL = 'http://127.0.0.1:8000/api';

function PopularCourses(){
    const [popularcourseData, setpopularcourseData] = useState([]);
    //const [nextUrl, setnextUrl] = useState();
    //const [previousUrl, setpreviousUrl] = useState();
    //fetch courses
    useEffect(() => {
        try {
          axios.get(baseURL + '/popular-courses/?all=1')
          .then((res)=>{
            //setnextUrl(res.data.next);
            //setpreviousUrl(res.data.previous);
            setpopularcourseData(res.data);
      })
      }catch (error) {
          console.log(error);
      }
        
    },[]);
    {/*
           const paginationHandler = (url) => {
        try {
            axios.get(url)
            .then((res)=>{
                setnextUrl(res.data.next);
                setpreviousUrl(res.data.previous);
                setpopularcourseData(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    }
    */}
 
    

    return(
        <div className="container mt-3">
           {/*LATEST COURSES START */}
           <h3 className='pb-1 my-4' style={{ textAlign:'center'}}>Popular Courses:
            </h3>
            <div className='row'>
                {popularcourseData && popularcourseData.map((row, index)=>
                <div className='col-md-3 mb-4'>
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
            {/*LATEST COURSES END */}
            {/* pagination */}
            {/*
             <nav aria-label="Page navigation example mt-5">
            <ul className="pagination justify-content-center">
                {previousUrl && 
                <li onClick={()=>paginationHandler(previousUrl)} className="page-item"><button className="page-link" ><i class="bi bi-arrow-left-circle-fill"></i>Previous</button ></li>
                }
                {nextUrl &&
                <li onClick={()=>paginationHandler(nextUrl)} className="page-item"><button  className="page-link" >Next<i class="bi bi-arrow-right-circle-fill"></i></button ></li>
                }
            </ul>
            </nav>
            
            */}
           
            {/*pagination end */}
        </div>
    );
}

export default PopularCourses;