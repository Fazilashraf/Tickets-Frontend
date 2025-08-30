import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate, useParams } from 'react-router-dom';
import { addSportBookingsAPI, getASportAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import './SportCheckout.css'; // Import the CSS file
import { IoShieldCheckmark } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa6";

function SportCheckout() {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const { id } = useParams()

    const [aSport, setASport] = useState([])

    const fetchSport = async () => {
        try {
            const response = await getASportAPI(id)
            console.log(response);
            setASport(response.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        fetchSport()
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pNumber: '',
        address: ''
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
        if (!formData.pNumber.trim()) tempErrors.pNumber = 'Phone Number is required';
        if (!formData.address.trim()) tempErrors.address = 'Address is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await addSportBookingsAPI(formData);
                console.log(response);
                setSuccessMsg('Info Recieved successfully!');
                setErrors({});
            } catch (err) {
                console.error('Error submitting form:', err);
            }
        }
    };

    const [today, setToday] = useState("");

    useEffect(() => {
        const now = new Date();

        // Format: "28 July 2025"
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-IN', options);
        setToday(formattedDate);
    }, []);

    const [quantity, setQuantity] = useState(1)

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value))
    }

    const totalSportPrice = aSport.price * quantity

    const handlePayment = async () => {
        if (!formData.name || !formData.email || !formData.pNumber || !formData.address) {
            alert("Please fill in billing details first");
            return;
        }

        const options = {
            key: 'rzp_test_DaEsMKWPwYOAPf', // Use your Razorpay test key
            amount: totalSportPrice,
            currency: 'INR',
            name: aSport.name,
            description: 'Sports Ticket Booking',
            handler: async function (response) {
                const bookingData = {
                    sportId: id,
                    sportName: aSport.name,
                    user: formData,
                    date: aSport.date,
                    time: aSport.time,
                    totalAmount: totalSportPrice,
                    paymentStatus: 'Success'
                };

                try {
                    await addSportBookingsAPI(bookingData);

                    toast.success('Booking Successful!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });

                    setTimeout(() => {
                        navigate('/myBookings');
                    }, 3000); // optional: wait for toast before navigating
                } catch (err) {
                    console.error('Error saving booking:', err);
                    toast.error('Failed to save booking to server');
                }
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.pNumber
            },
            theme: {
                color: '#0a0f50'
            }
        };

        const razor = new window.Razorpay(options);
        razor.open();
    };

    return (
        <div className="sport-checkout-wrapper">
            {/* Title Banner */}
            <div className="sport-checkout-banner-container">
                <img
                    className="sport-checkout-banner-img"
                    src={aSport.bannerImg}
                    alt={aSport.name || "Sport banner"}
                />
                <div className="sport-checkout-banner-overlay">
                    <h1 className="sport-checkout-banner-title text-light">{aSport.name}</h1>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="sport-checkout-navbar">
                <div className="container-fluid">
                    <div className="row align-items-center w-100">
                        <div className="col-12 col-md-6">
                            <button className="btn btn-outline-light sport-checkout-back-btn">
                                <IoMdArrowRoundBack className="fs-5 me-2" />
                                <span className="d-none d-sm-inline">Go Back</span>
                            </button>
                        </div>
                        <div className="col-12 col-md-6 mt-2 mt-md-0">
                            <h5 className="sport-checkout-date-display text-center text-md-end mb-0">
                                Today: {today}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row text-light mt-4 mb-5">

                    {/* Left Column - Forms */}
                    <div className="col-12 col-xl-7 mb-4 mb-xl-0 left-sec">
                        {/* Promo Code Section */}
                        <div className="sport-checkout-promo-section">
                            <div className="row align-items-center">
                                <div className="col-12 col-md-5 mb-2 mb-md-0">
                                    <h5 className="mb-0">Have any Promo Codes?</h5>
                                </div>
                                <div className="col-12 col-md-7">
                                    <input
                                        className="form-control sport-checkout-promo-input"
                                        type="search"
                                        placeholder="Enter Promo Codes"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Billing Section */}
                        <form onSubmit={handleSubmit} className="sport-checkout-billing-form">
                            <h2 className="sport-checkout-billing-title">Billing Info</h2>
                            <hr className="sport-checkout-divider" />

                            <div className="row">
                                <div className="col-12 col-md-6 mb-3">
                                    <input
                                        className="form-control sport-checkout-input"
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && (
                                        <small className="text-danger sport-checkout-error-text">
                                            {errors.name}
                                        </small>
                                    )}
                                </div>

                                <div className="col-12 col-md-6 mb-3">
                                    <input
                                        className="form-control sport-checkout-input"
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <small className="text-danger sport-checkout-error-text">
                                            {errors.email}
                                        </small>
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-md-6 mb-3">
                                    <input
                                        className="form-control sport-checkout-input"
                                        type="text"
                                        name="pNumber"
                                        placeholder="Enter Phone No"
                                        value={formData.pNumber}
                                        onChange={handleChange}
                                    />
                                    {errors.pNumber && (
                                        <small className="text-danger sport-checkout-error-text">
                                            {errors.pNumber}
                                        </small>
                                    )}
                                </div>

                                <div className="col-12 col-md-6 mb-3">
                                    <input
                                        className="form-control sport-checkout-input"
                                        type="text"
                                        name="address"
                                        placeholder="Enter Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                    {errors.address && (
                                        <small className="text-danger sport-checkout-error-text">
                                            {errors.address}
                                        </small>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-outline-light sport-checkout-submit-btn">
                                Submit
                            </button>

                            {successMsg && (
                                <div className="alert alert-success sport-checkout-success-alert">
                                    {successMsg}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="col-12 col-xl-4 offset-xl-0">
                        <div className="sport-checkout-summary-card">
                            <h2 className="sport-checkout-summary-title">Booking Summary</h2>
                            <hr className="sport-checkout-divider" />

                            <h4 className="sport-checkout-event-name">{aSport.name}</h4>

                            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                                <h5 className="sport-checkout-venue-name mb-2 mb-sm-0">{aSport.venue}</h5>
                                <select
                                    className="form-select sport-checkout-quantity-select"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <div className="d-flex justify-content-between mb-3 flex-wrap">
                                <div className="sport-checkout-datetime-info">
                                    <span className="text-primary sport-checkout-date-text">{aSport.date}</span>
                                    <span className="text-primary sport-checkout-time-text ms-2">{aSport.time}</span>
                                </div>
                                <h6 className="text-primary sport-checkout-tickets-label">Tickets</h6>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <h5 className="sport-checkout-price-label">Ticket Price</h5>
                                <h5 className="text-light sport-checkout-price-value">
                                    &#8377; {aSport.price}
                                </h5>
                            </div>

                            <hr className="sport-checkout-divider" />

                            <div className="d-flex justify-content-between mb-3">
                                <h4 className="text-primary sport-checkout-total-label">Total Price</h4>
                                <h4 className="text-primary sport-checkout-total-value">
                                    &#8377; {totalSportPrice}
                                </h4>
                            </div>
                        </div>

                        <div className="sport-checkout-payment-card">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="sport-checkout-pay-label">Pay Amount</h4>
                                <h4 className="text-light sport-checkout-pay-value">
                                    &#8377; {totalSportPrice}
                                </h4>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={handlePayment}
                                    className="btn sport-checkout-payment-btn w-100"
                                >
                                    <FaCreditCard className="fas fa-credit-card me-2"></FaCreditCard>
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

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default SportCheckout