import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

//bootsrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
//
const siteURL='http://127.0.0.1:8000/';

const baseURL='http://127.0.0.1:8000/api';


function CourseDetail() {

    const [courseData, setcourseData] = useState([]);
    const [chapterData, setchapterData] = useState([]);
    const [teacherData, setteacherData] = useState([]);
    const [relatedcourseData, setrelatedcourseData] = useState([]);
    const [techListData, settechListData] = useState([]);
    const [userLoginStatus, setuserLoginStatus] = useState();
    const [enrollStatus, setenrollStatus] = useState();
    const [ratingStatus, setratingStatus] = useState();
    const [AvgRating, setAvgRating] = useState(0);
    const [favoriteStatus, setfavoriteStatus] = useState();
    const [courseViews, setcourseViews] = useState(0);
    const {course_id} = useParams();
    
    //MODAL
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const studentId = localStorage.getItem('studentId')
   //fetch courses

    useEffect(() => {
        try {
            axios.get(baseURL +'/course/'+course_id)
                .then((res)=>{
                    setcourseData(res.data);
                    setchapterData(res.data.course_chapters);
                    setteacherData(res.data.teacher);
                    setrelatedcourseData(JSON.parse(res.data.related_videos));
                    settechListData(res.data.tech_list);
                    if (res.data.course_rating!='' && res.data.course_rating!=null){
                        setAvgRating(res.data.course_rating)
                    }
                    
                });

                //update view
                axios.get(baseURL +'/update-view/'+course_id)
                .then((res)=>{
                    setcourseViews(res.data.views)
                });

        }catch (error) {
            console.log(error);
        }
        //fetch enroll data
        try {
            axios.get(baseURL +'/fetch-enroll-status/'+studentId+'/'+course_id)
                .then((res)=>{
                    if (res.data.bool==true){
                        setenrollStatus('success')
                    }
        });
        }catch (error) {
            console.log(error);
        }

         //fetch rating status data
         try {
            axios.get(baseURL +'/fetch-rating-status/'+studentId+'/'+course_id)
                .then((res)=>{
                    if (res.data.bool==true){
                        setratingStatus('success')
                    }
        });
        }catch (error) {
            console.log(error);
        }
        //fetch favorite status data
        try {
            axios.get(baseURL +'/fetch-favorite-status/'+studentId+'/'+course_id)
                .then((res)=>{
                    if (res.data.bool==true){
                        setfavoriteStatus('success')
                    }else{
                        setfavoriteStatus('');
                    }
        });
        }catch (error) {
            console.log(error);
        }


        const studentLoginStatus = localStorage.getItem('studentLoginStatus');
        if(studentLoginStatus=='true'){
            setuserLoginStatus('success');
        }
        
    },[]);

    const enrollCourse=()=>{
        const _formData = new FormData();
    
        _formData.append('course', course_id);
        _formData.append('student',studentId);
        
        try{
            axios.post(baseURL+'/student-enroll-course/', _formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res)=> {
                if(res.status===201 || res.status===200){
                    Swal.fire({
                        title: 'You have successfully enrolled in this course',
                        icon: 'success',
                        toast: true,
                        timer: 3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton: 'false',
                        
                })
                setenrollStatus('success');
                //setTimeout(() => {
                    //window.location.reload();
                //}, 3000);
            
            
            }
            });
        }catch (error) {
            console.log(error);
            }
    }
    //markAsFavorite
    const markAsFavorite=()=>{
        const _formData = new FormData();
        _formData.append('course', course_id);
        _formData.append('student',studentId);
        _formData.append('status', true);

        try{
            axios.post(baseURL+'/student-add-favorite-course/', _formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res)=> {
                if(res.status===201 || res.status===200){
                    Swal.fire({
                        title: 'Course added to your favorites',
                        icon: 'success',
                        toast: true,
                        timer: 3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton: 'false',
                        
                });
                setfavoriteStatus('success');
        }
    });

    }catch (error) {
        console.log(error);
        }
    }
    //Add Rating
    const [ratingData, setratingData] = useState({
        rating: '',
        reviews: ''
        
    });    
    // change element input value
   const handleChange = (event) => {
    setratingData({
        ...ratingData,
        [event.target.name]: event.target.value
    });
    }

    const formsubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const _formRatingData = new FormData();
        
        _formRatingData.append('course', course_id);
        _formRatingData.append('student', studentId);
        _formRatingData.append('rating', ratingData.rating);
        _formRatingData.append('reviews', ratingData.reviews);
       
    
        try{
            axios.post(baseURL+'/course-rating/', _formRatingData,{
            })
            .then((res)=> {
                if(res.status===201 || res.status===200){
                    Swal.fire({
                        title: 'Rating and Review submitted successfully',
                        icon: 'success',
                        toast: true,
                        timer: 3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton: 'false',
                        
                })
                setTimeout(() => {
                    window.location.reload();
               }, 3000);
            
            
            }
            });
        }catch (error) {
            console.log(error);
            }
    
        };

    

    //remove Favorite
    const removeFavorite=(pk)=>{
        const _formData = new FormData();
        _formData.append('course', course_id);
        _formData.append('student',studentId);
        _formData.append('status', false);

        try{
            axios.get(baseURL +'/student-remove-favorite-course/'+course_id+'/'+studentId+'/', {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res)=> {
                if(res.status===201 || res.status===200){
                    Swal.fire({
                        title: 'Course has been removed from your favorites',
                        icon: 'success',
                        toast: true,
                        timer: 3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton: 'false',
                        
                });
                setfavoriteStatus('');
        }
    });

    }catch (error) {
        console.log(error);
        }
    }

  return (
    <div className='container mt-3'>
        <div className='row'>
            <div className='col-4'>
                <img src={courseData.featured_image} className="img-thumbnail" style={{ height: '300px' , borderRadius: '30px' }} alt={courseData.title} />
            </div>
            <div className='col-8'>
                <h1>Course Title: {courseData.title}</h1>
                <p>Course Description: {courseData.description}</p>
                <p className='fw-bold'>Course By: <Link to={`/instructor-detail/${teacherData.id}`} style={{ textDecoration: 'none'}}>{teacherData.full_name}</Link></p>

                <p className='fw-bold'>Techs:&nbsp;
                {techListData.map((tech, index)=>
                    <>
                    <Link to={`/category/${tech.trim()}`} className='badge badge-pill text-dark bg-warning' style={{textDecoration: 'none'}}>{tech.trim()}</Link>&nbsp;
                    </>
                )}
                </p>
             
                <p className='fw-bold'>Duration: <span style={{ color: 'blue'}}>3 Hours 30 Min</span></p>
                <p className='fw-bold'>Enrolled Students: <span style={{ color: 'blue'}}>{courseData.total_enrolled_students} Enrolled</span></p>
                <p className='fw-bold'>Views: <span style={{ color: 'green'}}>{courseViews}</span></p>
                <div className='fw-bold'>Rating:<span style={{ color: 'gold'}}> {AvgRating}/5</span>
                {enrollStatus=='success' && userLoginStatus=='success' && 
                   <>
                   {ratingStatus !=='success' &&
                        <button className='btn btn-success btn-sm ms-2' onClick={handleShow} id="ratingModal">Rating</button>
                    }
                    {ratingStatus =='success' &&
                    <p style={{color: 'grey', marginTop: '5px'}}>
                        <span style={{fontSize: 'small'}}>You have already rated this course</span>
                    </p>
                    }
                   {/*RATING MODAL START */}
                   <Modal show={show} onHide={handleClose} id="ratingModal">
                        <Modal.Header closeButton>
                        <Modal.Title>Rate for {courseData.title} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Rating</Form.Label>
                                <select onChange={handleChange} className='form-control' name='rating'>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Review / Comment</Form.Label>
                                <Form.Control as="textarea" rows={3} name='reviews' onChange={handleChange}/>
                            </Form.Group>
                            <button type='button' className='btn btn-primary' onClick={formsubmit} variant="primary">Submit</button>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                   {/*RATING MODAL END */}
               </>
                }
                </div>

                {enrollStatus=='success' && userLoginStatus=='success' &&
                <p style={{color: 'red'}}>
                    <span>You are already enrolled in this course</span>
                </p>
                }
                
                {userLoginStatus=='success' && enrollStatus!=='success' &&
                <p>
                    <Button style={{textDecoration:'none', color:'black'}} onClick={enrollCourse} variant="success" type='button' className='btn btn-md'><i class="bi bi-plus-square-fill"></i>Enroll to this course to view details</Button>
                </p>
                }

                {userLoginStatus=='success' && favoriteStatus!=='success' &&
                <p>
                    <Button style={{textDecoration:'none', color:'green'}} onClick={markAsFavorite} variant="dark" type='button' className='btn btn-md'><i class="bi bi-heart-fill"></i>Add to favorites</Button>
                </p>
                }
                {userLoginStatus=='success' && favoriteStatus=='success' &&
                <p>
                    <Button style={{textDecoration:'none', color:'black'}} onClick={removeFavorite} variant="danger" type='button' className='btn btn-md'><i class="bi bi-heart-fill"></i>Remove from favorites</Button>
                </p>
                }
                
                
                {userLoginStatus!=='success' &&
                <p>
                   <Link to="/user-login" style={{ textDecoration: 'none' }}>
                    <button style={{  backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px',cursor: 'pointer', }}><i className="bi bi-plus-square-fill" style={{ marginRight: '5px' }}></i>Login to enroll in this course</button>
                    </Link>
                </p>
                }
            </div>
        </div>
            {/* COURSE VIDEOS */}
            {enrollStatus=='success' && userLoginStatus=='success' &&
            <div className='card mt-4'>
            <Card >
                <Card.Header className='fw-bold' style={{ color: 'red'}}>In This Course</Card.Header>
                <ListGroup variant="flush">
                    {chapterData.map((chapter, index)=>
                    <ListGroup.Item>{chapter.title}
                        <span className='float-end'>
                            <span className='me-3'>Duration:  1HR 30MIN</span>
                            <Button variant="danger" className='btn btn-sm' onClick={handleShowModal} id="videoModal1"><i className="bi bi-youtube"></i> Play</Button>
                        </span>
                        {/*VIDEO MODAL START */}
                        <Modal show={showModal} onHide={handleCloseModal} id="videoModal1">
                        <Modal.Header closeButton>
                            <Modal.Title>{chapter.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <div className="ratio ratio-16x9">
                            <video controls>
                                <source src={chapter.video} type="video/mp4" />
                            </video>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                        </Modal>
                        {/*VIDEO MODAL END */}
                    </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
            </div>
            }
            {/*RELATED COURSES */}
            <h3 className='pb-1 mb-4 mt-3'>Related Courses:</h3>
            <div className='row mb-4'>
                {relatedcourseData.map((rcourse, index)=>
                <div className='col-md-3 mb-2'>
                <Card >
                <div>
                    <Card.Img variant="top" className="img-thumbnail" style={{ height: '200px' }} src={`${siteURL}media/${rcourse.fields.featured_image}`} alt={rcourse.fields.title}  />
                </div>
                    <Card.Body className="text-center">
                        <Card.Title>
                            <Link target='__blank' to={`/detail/${rcourse.pk}`} style={{ textDecoration: 'none', textAlign:"center" }}>{rcourse.fields.title}</Link>
                         </Card.Title>
                        <Button variant="secondary">
                            <Link target='__blank' to={`/detail/${rcourse.pk}`}style={{ textDecoration: 'none', color: "white"}}>Show Details</Link>
                        </Button>
                    </Card.Body>
                </Card>
                </div>
                )}
            </div>
          
            
    </div>
        
  )
}

export default CourseDetail
