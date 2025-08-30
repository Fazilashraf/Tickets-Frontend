import React, { useState } from 'react';
import './Contact.css';
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineAttachEmail } from "react-icons/md";
import { addTestimonyAPI } from '../../Services/allAPI';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form
  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Invalid email';
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        await addTestimonyAPI(formData);
        setSuccessMsg("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } catch (err) {
        console.error("Error submitting form:", err);
      }
    }
  };

  return (
    <div>
      {/* Banner */}
      <div className="banner-container">
        <img
          className="banner-img"
          src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM19zY2VuZV9vZl8zZF9pbGx1c3RyYXRpb25fbmVvbndpdGhvdXRfc2VtaS1yZV8xM2Q5OWIyOC0yN2NkLTQ1NDEtYTVmYy1lMzFkMjkxMTE4YTJfMS5qcGc.jpg"
          alt="About Us Banner"
        />
        <div className="banner-textt">
          <h1 className="banner-titlee">CONTACT US</h1>
          <h5 className="banner-breadcrumbb">Home &gt;&gt; Contact Us</h5>
        </div>
      </div>

      {/* Contact Section */}
      <div className="row p-5" style={{ backgroundColor: 'rgb(5, 23, 66)' }}>

        {/* Contact Form */}
        <div className="col-12 col-md-6 p-4">
          <h5 style={{ color: 'rgb(15, 220, 172)' }}>CONTACT US</h5>
          <h2 className="text-light mt-3">GET IN TOUCH</h2>
          <p className="text-light mt-3">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking.
          </p>

          <form onSubmit={handleSubmit}>
            <label className="mt-4 text-light">
              Name<span className="text-danger">*</span>
            </label>
            <input
              className="w-75 form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}

            <label className="mt-4 text-light">
              Email<span className="text-danger">*</span>
            </label>
            <input
              className="w-75 form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}

            <label className="mt-4 text-light">
              Subject<span className="text-danger">*</span>
            </label>
            <input
              className="w-75 form-control"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter Your Subject"
            />
            {errors.subject && <small className="text-danger">{errors.subject}</small>}

            <label className="mt-4 text-light">
              Message<span className="text-danger">*</span>
            </label>
            <textarea
              className="w-75 form-control"
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter Your Message"
            ></textarea>
            {errors.message && <small className="text-danger">{errors.message}</small>}

            <button
              type="submit"
              style={{ backgroundColor: 'rgb(15, 220, 172)' }}
              className="btn mt-3 w-75 text-light"
            >
              Send Your Message
            </button>

            {successMsg && <div className="alert alert-success mt-3">{successMsg}</div>}
          </form>
        </div>

        {/* Image + Contact Info */}
        <div className="col-12 col-md-6 text-center mt-5 mt-md-0">
          <img
            className="img-fluid rounded"
            src="https://img.freepik.com/premium-photo/photo-modern-business-buildings-financial-district-with-vertical-low-angle-shot-landscape_763111-105267.jpg"
            alt="office"
          />
          <div
            className="contact-twice d-flex flex-column flex-md-row align-items-center justify-content-center mt-4 p-3"
          >
            <div className="d-flex align-items-center me-md-4 mb-3 mb-md-0">
              <FaPhoneVolume className="fs-3 me-2" />
              <div>
                <h5>PHONE</h5>
                <p className="mb-0">+91 222 666 8975</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <MdOutlineAttachEmail className="fs-3 me-2" />
              <div>
                <h5>EMAIL</h5>
                <p className="mb-0">tickets@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;
