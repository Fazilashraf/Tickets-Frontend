import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import './SeatPlan.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAMovieAPI } from '../../Services/allAPI';
import { FaRegClock } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

function SeatPlan() {

    const { id } = useParams()
    const location = useLocation();
    const selectedDate = location.state?.selectedDate;

    console.log("Movie ID:", id);
    console.log("Selected Date:", selectedDate);

    const [selectedTime, setSelectedTime] = useState(null);

    const handleSelect = (index) => {
        setSelectedTime(index);
    };

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

    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsPerRow = 9;

    // track selected seats
    const [selectedSeats, setSelectedSeats] = useState([]);

    // handle click
    const handleSeatClick = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
        } else {
            if (selectedSeats.length >= 5) {
                toast.warning("You can only select up to 5 seats.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    // render seat buttons
    const renderSeats = () => {
        return rows.map(row => (
            <div key={row} className="seat-row">
                <span className="seat-label">{row}</span>
                {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatNumber = `${row}${i + 1}`;
                    const isSelected = selectedSeats.includes(seatNumber);
                    return (
                        <button
                            key={seatNumber}
                            className={`seat-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSeatClick(seatNumber)}
                        >
                            {i + 1}
                        </button>
                    );
                })}
            </div>
        ));
    };

    const navigate = useNavigate();

    const handleCheckout = () => {
        if (selectedTime === null) {
            toast.warning("Please select a time.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        if (selectedSeats.length === 0) {
            toast.warning("Please select your seats.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        const selectedTimeValue = aMovie.movieTime[selectedTime];

        navigate(`/mCheckout/${id}`, {
            state: {
                selectedDate,
                selectedTime: selectedTimeValue,
                selectedSeats
            }
        });
        scrollTo(0, 0)
    };

    return (
        <div className="seatplan-container">
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
            <div className="seatplan-navbar">
                <div className="container-fluid">
                    <div className="row align-items-center py-3">
                        <div className="col-12 col-md-4 mb-2 mb-md-0">
                            <Link to={`/viewMovie/${id}`}>
                                <button className='btn btn-outline-light back-btn'>
                                    <IoMdArrowRoundBack className='me-1' /> Go Back
                                </button>
                            </Link>
                        </div>
                        <div className="col-12 col-md-4 mb-2 mb-md-0 text-center">
                            <h5 className='date-display mb-0'>
                                {selectedDate?.day} {selectedDate?.month}, 2025
                            </h5>
                        </div>
                        <div className="col-12 col-md-4 text-center text-md-end">
                            <button className='btn btn-outline-light theatre-btn'>
                                {aMovie.theatreName}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container-fluid px-3">
                <div className="row g-3 g-lg-4">
                    {/* Timings Section */}
                    <div className="col-12 col-lg-5 order-2 order-lg-1">
                        <div className="timings-wrapper">
                            <div className="timings-card">
                                <h5 className="timings-title">Available Timings</h5>
                                <div className="timings-list">
                                    {aMovie.movieTime && aMovie.movieTime.length > 0 ? (
                                        aMovie.movieTime.map((mTime, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleSelect(index)}
                                                className={`timing-item ${selectedTime === index ? 'active' : ''}`}
                                            >
                                                <FaRegClock className='me-2' /> {mTime}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="loading-text">Loading show timings...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seat Selection Section */}
                    <div className="col-12 col-lg-7 order-1 order-lg-2">
                        <div className="seat-selection-wrapper">
                            <div className="seat-container">
                                <h3 className="seat-title">Select Your Seat</h3>
                                <div className="screen mb-4">SCREEN THIS SIDE</div>
                                <div className="seats-grid">
                                    {renderSeats()}
                                </div>
                                <div className="selected-seats-info mt-4">
                                    <h5 className="selected-seats-title">
                                        Selected Seats: <span className="selected-seats-list">{selectedSeats.join(', ') || 'None'}</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Button */}
            <div className="checkout-section text-center py-4">
                <button
                    className='btn checkout-btn'
                    onClick={handleCheckout}
                >
                    Checkout <FaArrowRight className='ms-2' />
                </button>
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

export default SeatPlan