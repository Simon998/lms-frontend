import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const baseURL='http://127.0.0.1:8000/api';
function Category(){
    const [categoryData, setcategoryData] = useState([]);
    
    useEffect(() => {
        try {
            axios.get(baseURL +'/category/')
                .then((res)=>{
                    setcategoryData(res.data);
        });
        }catch (error) {
            console.log(error);
        }
        
    },[]);

    return(
            <div className="container mt-3">
           {/*category START */}
            <h3 className='pb-1 mb-4'style={{ textAlign:'center'}}>All Categories</h3>
            <div className='row mb-4'>
            {categoryData && categoryData.map((row, index)=> 
                <div className='col-md-3 mb-4' key={index}>
                    <Card className="h-150">
                        <Card.Body className="text-center d-flex flex-column">
                            <Card.Title>
                                <Link to={`/course/${row.id}/${row.title}` } style={{ textDecoration: 'none', textAlign:"center" }}>{row.title} ({row.total_courses})</Link>
                            </Card.Title>
                            <Card.Text>
                                <span className="text-success">{row.description}</span>
                            </Card.Text>
                            <Button variant="secondary" className="mt-auto">
                                <Link to={`/course/${row.id}/${row.title}` }   style={{ textDecoration: 'none', color: "white"}}>Show Details</Link>
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
                )}
            </div>
            {/*categoryS END */}
            {/* pagination */}
      
            {/*pagination end */}
        </div>
    );
}

export default  Category;