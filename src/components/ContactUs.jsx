import React from 'react'
import { useState, useEffect} from "react";
import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/contact/';
function ContactUs() {

    const [contactData, setcontactData] = useState({
        'full_name': '',
        'email': '',
        'message': '',
        'status': ''
   });
   
   

   // change element input value
   const handleChange = (event) => {
        setcontactData({
            ...contactData,
            [event.target.name]: event.target.value
        });
   }

   // submit form
   const submitForm = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const contactFormData = new FormData();
        contactFormData.append('full_name', contactData.full_name);
        contactFormData.append('email', contactData.email);
        contactFormData.append('message', contactData.message);

        axios.post(baseURL, contactFormData)
        .then(response => {
            //alert('Registration successful'); // Alert when registration is successful
            setcontactData ({
                'full_name': '',
                'email': '',
                'message': '',
                'status': 'success'
           }); 
           
        })
        .catch(error => {
            //alert('Registration failed'); // Alert when registration fails
            console.log(error); 
            setcontactData({'status': 'false'});
        });
   };


   useEffect(() => {
    document.title = 'Message Us'
   });
  return (
    <div className="container mt-4">
    <div className="row">
        <div className="col-6 offset-3">
         
            <div className="card">
                <h3 className="card-header mb-3" style={{ textAlign: 'center' }}>Contact Us</h3>
                {contactData.status === 'success' && <div className="alert alert-success">Message sent successfully</div>}
                {contactData.status === 'false' && <div className="alert alert-danger">Message not sent</div>}
                <div className="card-body">
                    {/* FORM */}
                    <form>
                        <div className="mb-3">
                            <label htmlFor="full_name" className="form-label">Name</label>
                            <input value={contactData.full_name} onChange={handleChange} type="text" id="full_name" name="full_name" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input value={contactData.email} onChange={handleChange} type="email" id="email" name="email" className="form-control" autoComplete="email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea rows='6' value={contactData.message} onChange={handleChange} className="form-control" id="message" name="message"></textarea>
                        </div>
                        <button type="submit" onClick={submitForm} className="btn btn-primary">Send</button>
                    </form>
                    {/* FORM */}
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default ContactUs
