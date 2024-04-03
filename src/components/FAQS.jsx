import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';

import axios from "axios";
import { useState, useEffect } from "react";

const baseURL='http://127.0.0.1:8000/api';
function FAQS(){
    const [faqData, setfaqData] = useState([]);
    
    useEffect(() => {
        try {
            axios.get(baseURL +'/faq/')
                .then((res)=>{
                    setfaqData(res.data);
        });
        }catch (error) {
            console.log(error);
        }
        
    },[]);

    return(
            <div className="container mt-3">
           {/*category START */}
            <h3 className='pb-1 mb-4'style={{ textAlign:'center'}}>FAQs</h3>
            <div>
            {faqData && faqData.map((row, index)=> 
                <div>
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        {row.question}
                        </Accordion.Header>
                        {index==0 &&
                        <Accordion.Body>
                         {row.answer}
                        </Accordion.Body>
                        }
                        {index > 0 &&
                        <Accordion.Body>
                         {row.answer}
                        </Accordion.Body>
                        }   

                </Accordion.Item>
                </Accordion>
                </div>
                )}
            </div>
            {/*categoryS END */}
            {/* pagination */}
      
            {/*pagination end */}
        </div>
    );
}

export default  FAQS;