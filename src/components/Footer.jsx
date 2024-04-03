import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
   <footer className="footer py-3 mt-4 bg-secondary mb-0">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Home</Link></li>
      <li className="nav-item"><Link to="/faqs" className="nav-link px-2 text-body-secondary">FAQs</Link></li>
      <li className="nav-item"><Link to="/about" className="nav-link px-2 text-body-secondary">About Us</Link></li>
      <li className="nav-item"><Link to="/contact-us" className="nav-link px-2 text-body-secondary">Contact Us</Link></li>
    </ul>
    <p className="text-center text-body-secondary">© 2024 CUK, Inc</p>
    </footer>
    </div>
  )
}

export default Footer
