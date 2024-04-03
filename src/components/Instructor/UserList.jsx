import { Link } from "react-router-dom";
import InstructorSidebar from "./InstructorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const baseURL='http://127.0.0.1:8000/api';
function UserList(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [StudentData, setStudentData] = useState([]);

    const teacherId = localStorage.getItem('teacherId')
    //console.log (teacherId);

     //fetch enrolled students
     useEffect(() => {
        try {
            axios.get(baseURL +'/fetch-all-enrolled-students/'+teacherId)
            .then((res)=>{
                setStudentData(res.data);
        })
        }catch (error) {
            console.log(error);
        }
        
    },[]);

    

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <InstructorSidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Student(s) List</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Interested Categories</th>
                                    <th>Assignment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {StudentData.map((row, index)=>
                                <tr>
                                <td >
                                    
                                    <button style={{ backgroundColor: 'grey', textDecoration: 'none', color: 'black', border: 'none', padding: '5px 20px', borderRadius: '5px', width: '100%' }}>{row.student.full_name}</button>
                                    
                                </td>
                                <td >
                                    <button style={{ textDecoration: 'none', justifyContent:'center', backgroundColor: 'blue', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px',width: '100%'  }}>{row.student.email}</button>
                                </td>
                                <td >
                                    <button style={{ textDecoration: 'none', justifyContent:'center', backgroundColor: 'black', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px',width: '100%'  }}>{row.student.username}</button>
                                </td>
                                <td>
                                    <button style={{ textDecoration: 'none', justifyContent:'center', backgroundColor: 'dark-grey', color: 'black', border: 'none', padding: '5px 10px', borderRadius: '5px',width: '100%'  }}>{row.student.interested_categories}</button>
                                </td>
                                <td>
                                <Link to={`/show-assignment/${row.student.id}/${teacherId}`}className="btn btn-sm btn-warning" style={{width:'80%'}}>Assignment</Link>
                                <Link to={`/add-assignment/${row.student.id}/${teacherId}`}className="btn btn-sm btn-success mt-2" style={{width:'80%'}}>Add Assignment</Link>
                                </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default UserList;