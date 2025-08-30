import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addMovieBookinsAPI, getAMovieAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import './MovieCheckout.css';
import { IoShieldCheckmark } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa6";

function MovieCheckout() {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const navigate = useNavigate()

    const { id } = useParams()

    const [aMovie, setAMovie] = useState({
        reviews: [],
        movPics: [],
        cast: [],
        genre: [],
        movieDate: [],
        movieTime: []
    })

    const fetchMovie = async () => {
        try {
            const response = await getAMovieAPI(id)
            console.log(response);
            setAMovie(response.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [])

    const location = useLocation();
    const { selectedDate, selectedTime, selectedSeats, seatNumber } = location.state;

    console.log(selectedDate, selectedTime, selectedSeats, seatNumber);

    const price = selectedSeats.length * aMovie.ticketPrice;
    console.log(price);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await addMovieBookinsAPI(formData);
                console.log(response);
                setSuccessMsg('Info Received successfully!');
                setErrors({});
            } catch (err) {
                console.error('Error submitting form:', err);
            }
        }
    };


    const handlePayment = async () => {
        if (!formData.name || !formData.email || !formData.pNumber || !formData.address) {
            alert("Please fill in billing details first");
            return;
        }

        const options = {
            key: 'rzp_test_DaEsMKWPwYOAPf', // Use your Razorpay test key
            amount: price * 100,
            currency: 'INR',
            name: aMovie.name,
            description: 'Movie Ticket Booking',
            handler: async function (response) {
                const bookingData = {
                    movieId: id,
                    movieName: aMovie.name,
                    user: formData,
                    date: `${selectedDate.day} ${selectedDate.month}`,
                    time: selectedTime,
                    seats: selectedSeats,
                    totalAmount: price,
                    paymentStatus: 'Success'
                };

                try {
                    await addMovieBookinsAPI(bookingData);

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
                    }, 3000);
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
        <div className="moviecheckout-container">
            {/* Title Banner */}
            <div className="hero-banner position-relative">
                <img
                    className="hero-image w-100"
                    src={aMovie.bannerImg}
                    alt={aMovie.name}
                />

                <div className="hero-overlay position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                    <div className="hero-content text-center px-3">
                        <h1 className="movie-title text-light mb-3">{aMovie.name}</h1>
                        <div className="genre-buttons d-flex flex-wrap justify-content-center gap-2 mb-2">
                            {aMovie.genre.map((G, index) => (
                                <button
                                    key={index}
                                    className='btn btn-outline-light genre-btn'
                                >
                                    {G}
                                </button>
                            ))}
                            <button className='btn btn-outline-light screen-btn'>{aMovie.screen}</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="checkout-navbar">
                <div className="container-fluid">
                    <div className="row align-items-center py-3">
                        <div className="col-12 col-md-6 mb-2 mb-md-0">
                            <Link to={`/seatPlan/${id}`}>
                                <button className='btn btn-outline-light baack-btn'>
                                    <IoMdArrowRoundBack className='me-1' /> Go Back
                                </button>
                            </Link>
                        </div>
                        <div className="col-12 col-md-6 text-center text-md-end">
                            <h5 className='date-display mb-0'>
                                {selectedDate?.day} {selectedDate?.month}, 2025
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container-fluid">
                <div className="row g-3 g-lg-4 checkout-content">

                    {/* Left Column - Forms */}
                    <div className="col-12 col-lg-7 order-2 order-lg-1">
                        {/* Promo Code Section */}
                        <div className="promo-section">
                            <div className="promo-card">
                                <div className="row align-items-center g-3">
                                    <div className="col-12 col-md-5">
                                        <h4 className="promo-title mb-0">Have any Promo Codes?</h4>
                                    </div>
                                    <div className="col-12 col-md-7">
                                        <input
                                            className='form-control promo-input'
                                            type="text"
                                            placeholder='Enter Promo Codes'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Billing Section */}
                        <div className="billing-section">
                            <form onSubmit={handleSubmit} className="billing-card">
                                <h2 className="billing-title">Billing Info</h2>
                                <hr className="billing-divider" />

                                <div className='row g-3 mb-4'>
                                    <div className='col-12 col-md-6'>
                                        <div className="form-group">
                                            <input
                                                className='form-control billing-input'
                                                type="text"
                                                name="name"
                                                placeholder='Full Name'
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                            {errors.name && <small className='error-text'>{errors.name}</small>}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <div className="form-group">
                                            <input
                                                className='form-control billing-input'
                                                type="email"
                                                name="email"
                                                placeholder='Enter Email'
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            {errors.email && <small className='error-text'>{errors.email}</small>}
                                        </div>
                                    </div>
                                </div>

                                <div className='row g-3 mb-4'>
                                    <div className='col-12 col-md-6'>
                                        <div className="form-group">
                                            <input
                                                className='form-control billing-input'
                                                type="text"
                                                name="pNumber"
                                                placeholder='Enter Phone No'
                                                value={formData.pNumber}
                                                onChange={handleChange}
                                            />
                                            {errors.pNumber && <small className='error-text'>{errors.pNumber}</small>}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <div className="form-group">
                                            <input
                                                className='form-control billing-input'
                                                type="text"
                                                name="address"
                                                placeholder='Enter Address'
                                                value={formData.address}
                                                onChange={handleChange}
                                            />
                                            {errors.address && <small className='error-text'>{errors.address}</small>}
                                        </div>
                                    </div>
                                </div>

                                <button type='submit' className='btn submmit-btn'>
                                    Submit Details
                                </button>
                                {successMsg && <div className="succeess-message mt-3">{successMsg}</div>}
                            </form>
                        </div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="col-12 col-lg-5 order-1 order-lg-2">
                        <div className="summary-wrapper">
                            {/* Booking Summary */}
                            <div className="summary-card">
                                <h2 className="summary-title">Booking Summary</h2>
                                <hr className="summary-divider" />

                                <h4 className="movie-name">{aMovie.name}</h4>

                                <div className='genre-info mb-3'>
                                    <span className='genre-text'>
                                        {aMovie.genre.slice(0, 3).join(', ')}
                                    </span>
                                    <span className='screen-text ms-2'>{aMovie.screen}</span>
                                </div>

                                <div className='summary-row'>
                                    <h4 className="theatre-name">{aMovie.theatreName}</h4>
                                    <h5 className='seat-count'>{selectedSeats?.length}</h5>
                                </div>

                                <div className='summary-row'>
                                    <div className='date-time-info'>
                                        <span className='date-text'>{selectedDate?.day} {selectedDate?.month},</span>
                                        <span className='time-text ms-2'>{selectedTime}</span>
                                    </div>
                                    <h5 className='tickets-label'>Tickets</h5>
                                </div>

                                <div className='summary-row'>
                                    <h4>Ticket Price</h4>
                                    <h5 className='price-text'>&#8377; {aMovie.ticketPrice}</h5>
                                </div>

                                <hr className="summary-divider" />

                                <div className='summary-row total-row'>
                                    <h4 className='total-label'>Total Price</h4>
                                    <h5 className='total-price'>&#8377; {price}</h5>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="payment-card">
                                <div className='payment-row'>
                                    <h4>Pay Amount</h4>
                                    <h5 className='pay-amount'>&#8377; {price}</h5>
                                </div>
                                <div className="text-center mt-4">
                                    <button
                                        onClick={handlePayment}
                                        className='btn paayment-btn'
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

export default MovieCheckout