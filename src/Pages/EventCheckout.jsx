import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { addEventBookingsAPI, getAEventAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import './EventCheckout.css';
import { IoShieldCheckmark } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa6";

function EventCheckout() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    const { id } = useParams();
    const navigate = useNavigate();

    const [aEvent, setAEvent] = useState({ evtPics: [] });
    const [formData, setFormData] = useState({ name: '', email: '', pNumber: '', address: '' });
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [today, setToday] = useState("");

    const fetchEvent = async () => {
        try {
            const response = await getAEventAPI(id);
            setAEvent(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchEvent();
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        setToday(now.toLocaleDateString('en-IN', options));
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validate = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'Name is required';
        if (!formData.email.trim()) tempErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Invalid email';
        if (!formData.pNumber.trim()) tempErrors.pNumber = 'Phone Number is required';
        if (!formData.address.trim()) tempErrors.address = 'Address is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await addEventBookingsAPI(formData);
                setSuccessMsg('Info received successfully!');
                setErrors({});
            } catch (err) {
                console.error('Error submitting form:', err);
            }
        }
    };

    const handleQuantityChange = (e) => setQuantity(Number(e.target.value));
    const totalEventPrice = aEvent.price * quantity;

    const handlePayment = async () => {
        if (!formData.name || !formData.email || !formData.pNumber || !formData.address) {
            alert("Please fill in billing details first");
            return;
        }
        const options = {
            key: 'rzp_test_DaEsMKWPwYOAPf',
            amount: totalEventPrice * 100,
            currency: 'INR',
            name: aEvent.name,
            description: 'Event Ticket Booking',
            handler: async function () {
                const bookingData = {
                    eventId: id,
                    eventName: aEvent.name,
                    user: formData,
                    date: aEvent.date,
                    time: aEvent.time,
                    totalAmount: totalEventPrice,
                    paymentStatus: 'Success'
                };
                try {
                    await addEventBookingsAPI(bookingData);
                    toast.success('Booking Successful!', { position: "top-center", autoClose: 2000, theme: "dark" });
                    setTimeout(() => navigate('/myBookings'), 3000);
                } catch (err) {
                    console.error('Error saving booking:', err);
                    toast.error('Failed to save booking to server');
                }
            },
            prefill: { name: formData.name, email: formData.email, contact: formData.pNumber },
            theme: { color: '#0a0f50' }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    };

    return (
        <div className="event-checkout">
            {/* Banner */}
            <div className="banner-container">
                <img className="banner-img" src={aEvent.bannerImg} alt={aEvent.name || "Event Banner"} />
                <div className="banner-overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="banner-title">{aEvent.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="checkout-nav">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <button onClick={() => navigate(-1)} className="back-btn">
                                <IoMdArrowRoundBack className='back-icon' /> 
                                <span className="back-text">Go Back</span>
                            </button>
                        </div>
                        <div className="col">
                            <div className="date-info">
                                <span className="date-label d-none d-sm-inline">Today: </span>
                                <span className="date-value">{today}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="checkout-content">
                <div className="container">
                    <div className="row g-3 g-md-4">
                        {/* Billing Section */}
                        <div className="col-12 col-lg-7 order-2 order-lg-1">
                            {/* Promo Code */}
                            <div className="promo-section">
                                <div className="promo-box">
                                    <h4 className="promo-title">Have any Promo Codes?</h4>
                                    <div className="promo-input-wrapper">
                                        <input 
                                            className="promo-input" 
                                            type="search" 
                                            placeholder="Enter Promo Codes" 
                                        />
                                        <button className="promo-apply-btn d-none d-md-inline-block">Apply</button>
                                    </div>
                                </div>
                            </div>

                            {/* Billing Form */}
                            <div className="billing-section">
                                <form onSubmit={handleSubmit} className="billing-box">
                                    <div className="billing-header">
                                        <h2 className="billing-title">Billing Information</h2>
                                        <hr className="billing-divider" />
                                    </div>
                                    
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <div className="input-group">
                                                <input 
                                                    className={`form-control custom-input ${errors.name ? 'is-invalid' : ''}`}
                                                    type="text" 
                                                    name="name" 
                                                    placeholder="Full Name" 
                                                    value={formData.name} 
                                                    onChange={handleChange} 
                                                />
                                                {errors.name && <div className="error-message">{errors.name}</div>}
                                            </div>
                                        </div>
                                        
                                        <div className="col-12 col-sm-6">
                                            <div className="input-group">
                                                <input 
                                                    className={`form-control custom-input ${errors.email ? 'is-invalid' : ''}`}
                                                    type="email" 
                                                    name="email" 
                                                    placeholder="Enter Email" 
                                                    value={formData.email} 
                                                    onChange={handleChange} 
                                                />
                                                {errors.email && <div className="error-message">{errors.email}</div>}
                                            </div>
                                        </div>
                                        
                                        <div className="col-12 col-sm-6">
                                            <div className="input-group">
                                                <input 
                                                    className={`form-control custom-input ${errors.pNumber ? 'is-invalid' : ''}`}
                                                    type="text" 
                                                    name="pNumber" 
                                                    placeholder="Enter Phone No" 
                                                    value={formData.pNumber} 
                                                    onChange={handleChange} 
                                                />
                                                {errors.pNumber && <div className="error-message">{errors.pNumber}</div>}
                                            </div>
                                        </div>
                                        
                                        <div className="col-12 col-sm-6">
                                            <div className="input-group">
                                                <input 
                                                    className={`form-control custom-input ${errors.address ? 'is-invalid' : ''}`}
                                                    type="text" 
                                                    name="address" 
                                                    placeholder="Enter Address" 
                                                    value={formData.address} 
                                                    onChange={handleChange} 
                                                />
                                                {errors.address && <div className="error-message">{errors.address}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="billing-footer">
                                        <button type="submit" className="submit-btn">
                                            Submit Information
                                        </button>
                                        {successMsg && (
                                            <div className="success-message">
                                                <i className="fas fa-check-circle me-2"></i>
                                                {successMsg}
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="col-12 col-lg-5 order-1 order-lg-2">
                            {/* Booking Summary */}
                            <div className="summary-section">
                                <div className="summary-box">
                                    <div className="summary-header">
                                        <h2 className="summary-title">Booking Summary</h2>
                                        <hr className="summary-divider" />
                                    </div>
                                    
                                    <div className="event-info">
                                        <h4 className="event-name">{aEvent.name}</h4>
                                        
                                        <div className="venue-quantity-row">
                                            <div className="venue-info">
                                                <h5 className="venue-name">{aEvent.venue}</h5>
                                            </div>
                                            <div className="quantity-selector">
                                                <label className="quantity-label d-none d-sm-block">Tickets:</label>
                                                <select 
                                                    className="form-select quantity-select" 
                                                    value={quantity} 
                                                    onChange={handleQuantityChange}
                                                >
                                                    {[1,2,3,4,5].map(num => (
                                                        <option key={num} value={num}>{num}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="event-details-row">
                                            <div className="event-datetime">
                                                <p className="event-date">{aEvent.date}</p>
                                                <p className="event-time">{aEvent.time}</p>
                                            </div>
                                            <div className="ticket-type">
                                                <h6 className="ticket-label">General Tickets</h6>
                                            </div>
                                        </div>
                                        
                                        <div className="price-breakdown">
                                            <div className="price-row">
                                                <span className="price-label">Ticket Price</span>
                                                <span className="price-value">&#8377; {aEvent.price}</span>
                                            </div>
                                            <div className="price-row">
                                                <span className="price-label">Quantity</span>
                                                <span className="price-value">x {quantity}</span>
                                            </div>
                                        </div>
                                        
                                        <hr className="total-divider" />
                                        
                                        <div className="total-row">
                                            <h4 className="total-label">Total Price</h4>
                                            <h4 className="total-price">&#8377; {totalEventPrice}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="payment-section">
                                <div className="payment-box">
                                    <div className="payment-header">
                                        <div className="payment-amount-row">
                                            <h4 className="payment-label">Pay Amount</h4>
                                            <h4 className="payment-amount">&#8377; {totalEventPrice}</h4>
                                        </div>
                                    </div>
                                    
                                    <button onClick={handlePayment} className="payment-btn">
                                        <FaCreditCard  className="fas fa-credit-card me-2"></FaCreditCard>
                                        Confirm Payment
                                    </button>
                                    
                                    <div className="payment-security">
                                        <small className="security-text">
                                            <IoShieldCheckmark className="fas fa-shield-alt me-1"></IoShieldCheckmark>
                                            Secure payment powered by Razorpay
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={2000} theme="dark" />
        </div>
    );
}

export default EventCheckout;