import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const baseURL='http://127.0.0.1:8000/api';
function CategoryCourses(){
    const [courseData, setcourseData] = useState([]);
    const {category_id,category_slug} = useParams();
    const [nextUrl, setnextUrl] = useState();
    const [previousUrl, setpreviousUrl] = useState();

    
    useEffect(() => {
      fetchData(baseURL +'/course/?category='+category_id);
    },[]);

    const paginationHandler = (url) => {
        fetchData(url);

    }

    function fetchData (url){
        try {
            axios.get(url)
                .then((res)=>{
                    setnextUrl(res.data.next);
                    setpreviousUrl(res.data.previous);
                    setcourseData(res.data.results);
        });
        }catch (error) {
            console.log(error);
        }
        
    }



    return(
            <div className="container mt-3">
           {/*COURSES START */}
            <h3 className='pb-1 mb-4'style={{ textAlign:'center'}}>{category_slug}</h3>
            <div className='row mb-4'>
            {courseData && courseData.map((course, index)=> 
                <div className='col-md-3 mb-4' key={index}>
                    <Card className="h-150">
                        <div >
                            <Card.Img variant="top" src={course.featured_image} className="img-thumbnail" style={{ height: '200px'  }}/>
                        </div>
                        <Card.Body className="text-center d-flex flex-column">
                            <Card.Title>
                                <Link to={`/detail/${course.id}` } style={{ textDecoration: 'none', textAlign:"center" }}>{course.title}</Link>
                            </Card.Title>
                            <Button variant="secondary" className="mt-auto">
                                <Link to={`/detail/${course.id}` } style={{ textDecoration: 'none', color: "white"}}>Show Details</Link>
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
                )}
            </div>
            {/*COURSES END */}
             {/* pagination */}
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
            {/*pagination end */}
        </div>
    );
}

export default  CategoryCourses;