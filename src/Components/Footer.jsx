import React from 'react'
import './Footer.css'
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdb-react-ui-kit'
import { IoTicketOutline } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";


function Footer() {
  return (
    <div style={{ backgroundColor: 'rgb(5, 23, 66)' }}>
      {/* Subscribe Section */}
      <div className='subscribe-container shadow mx-auto'>
        <h3 className='text-center text-light'>SUBSCRIBE NOW</h3>
        <h2 className='text-center text-light'>TO GET LATEST UPDATE</h2>

        <div className="input-container mt-4 mx-auto">
          <input type="text" placeholder="Enter email" />
          <button type="button">Submit</button>
        </div>

        <p className='text-center mt-3 text-light'>
          We send you latest update and news to your email
        </p>
      </div>

      {/* Footer Section */}
      <MDBFooter style={{ backgroundColor: 'rgb(5, 23, 66)' }} className='text-center text-lg-start text-muted mt-3'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom flex-wrap'>
          <div id='BrandName' className='me-5 mb-3 mb-lg-0'>
            <span style={{ fontWeight: 'bolder', fontSize: 32, color: 'white' }}>
              <IoTicketOutline className='fs-1 me-2 mb-2' /> Tickets
            </span>
          </div>

          <div className='mt-2 d-flex gap-3'>
            <a href='#!' className='text-reset'><FaFacebookF color="rgb(15, 220, 172)" size={22} /></a>
            <a href='#!' className='text-reset'><FaTwitter color="rgb(15, 220, 172)" size={22} /></a>
            <a href='#!' className='text-reset'><FaGoogle color="rgb(15, 220, 172)" size={22} /></a>
            <a href='#!' className='text-reset'><FaInstagram color="rgb(15, 220, 172)" size={22} /></a>
            <a href='#!' className='text-reset'><FaLinkedin color="rgb(15, 220, 172)" size={22} /></a>
            <a href='#!' className='text-reset'><FaGithub color="rgb(15, 220, 172)" size={22} /></a>
          </div>

        </section>

        <section>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4 text-light'>
                <h6 style={{ color: 'rgb(15, 220, 172)' }} className='text-uppercase fw-bold mb-4'>Company</h6>
                <p>
                  Here you can use rows and columns to organize your footer content.
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4 text-light'>
                <h6 style={{ color: 'rgb(15, 220, 172)' }} className='text-uppercase fw-bold mb-4'>Important Links</h6>
                <p><a href='/aboutus' className='text-reset'>About Us</a></p>
                <p><a href='/contact' className='text-reset'>Contact</a></p>
                <p><a href='#!' className='text-reset'>FAQ</a></p>
                <p><a href='#!' className='text-reset'>Terms & Conditions</a></p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4 text-light'>
                <h6 style={{ color: 'rgb(15, 220, 172)' }} className='text-uppercase fw-bold mb-4'>Quick Browse</h6>
                <p><a href='#!' className='text-reset'>Support</a></p>
                <p><a href='#!' className='text-reset'>Blog</a></p>
                <p><a href='#!' className='text-reset'>Events</a></p>
                <p><a href='#!' className='text-reset'>Help</a></p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4 text-light'>
                <h6 style={{ color: 'rgb(15, 220, 172)' }} className='text-uppercase fw-bold mb-4'>Download</h6>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className='d-flex flex-column gap-2 align-items-center align-items-md-start'>
                  <img className='rounded' width={150} src='https://themes.themewild.com/ticket/assets/img/app/app_store.jpg' alt="" />
                  <img className='rounded' width={150} src='https://themes.themewild.com/ticket/assets/img/app/google_play.jpg' alt="" />
                  <img className='rounded' width={150} src='https://themes.themewild.com/ticket/assets/img/app/windows.jpg' alt="" />
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className='text-center text-light p-4'>
          © 2025 Copyright@
          <a className='text-light fw-bold' href='#!'> ticket.com </a>
        </div>
      </MDBFooter>
    </div>
  )
}

export default Footer
