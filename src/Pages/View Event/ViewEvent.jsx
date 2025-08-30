import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaFacebookF, FaTwitter, FaPinterestP, FaInstagram } from 'react-icons/fa';
import './ViewEvent.css';
import { getAEventAPI } from '../../Services/allAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillLike } from "react-icons/ai";
import { FaGreaterThan } from "react-icons/fa6";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdAccessTimeFilled } from "react-icons/md";
import { FaLanguage } from "react-icons/fa";
import { TbTimeDuration30 } from "react-icons/tb";

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="responsive-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Terms And Conditions
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-3 p-md-4">
                <div className="terms-content">
                    <p>
                        1. Tickets once booked cannot be exchanged or refunded <br />
                        2. An Internet handling fee per ticket may be levied. Please check the total amount before payment <br />
                        3. We recommend that you arrive at-least 30 minutes prior at the venue for a seamless entry <br />
                        4. Videography strictly not allowed. <br />
                        5. Please do not purchase tickets if you feel sick <br />
                        6. Unlawful resale (or attempted unlawful resale) of a ticket would lead to seizure or cancellation of that ticket without refund or other compensation <br />
                        7. Rights of admission reserved <br />
                        8. These terms and conditions are subject to change from time to time at the discretion of the organizer <br />
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className="btn-responsive">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ViewEvent() {
    const { id } = useParams()

    const [aEvent, setAEvent] = useState({
        evtPics: []
    })

    const fetchEvent = async () => {
        try {
            const response = await getAEventAPI(id)
            console.log(response);
            setAEvent(response.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchEvent()
    }, [])

    // Countdown logic
    const calculateTimeLeft = () => {
        const difference = +new Date(aEvent.ucDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const [modalShow, setModalShow] = React.useState(false);

    const navigate = useNavigate()

    const eventBooking = () => {
        navigate(`/eCheckout/${id}`)
        scrollTo(0, 0)
    }

    return (
        <div className="view-event-container">
            {/* Title Banner */}
            <div className="banner-container">
                <img 
                    className="banner-image"
                    src={aEvent.bannerImg}
                    alt={aEvent.name || "Event Banner"}
                />
                <div className="banner-overlay">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6">
                                <h1 className="banner-title text-center">
                                    {aEvent.name}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Countdown & Event Info */}
            <div className="countdown-section">
                <div className="container">
                    <div className="countdown-card">
                        <h3 className="countdown-heading">UPCOMING DATE</h3>

                        <div className="countdown-display">
                            <div className="countdown-time">
                                <span className="time-value">{timeLeft.days}</span>
                                <span className="time-separator">:</span>
                                <span className="time-value">{timeLeft.hours}</span>
                                <span className="time-separator">:</span>
                                <span className="time-value">{timeLeft.minutes}</span>
                                <span className="time-separator">:</span>
                                <span className="time-value">{timeLeft.seconds}</span>
                            </div>
                            <div className="countdown-labels">
                                <span className="time-label">DAYS</span>
                                <span className="time-label">HOURS</span>
                                <span className="time-label">MIN</span>
                                <span className="time-label">SEC</span>
                            </div>
                        </div>

                        <hr className="countdown-divider" />

                        <div className="row event-info-row">
                            <div className="col-12 col-sm-6 col-lg-3 event-info-col">
                                <div className="event-info-item">
                                    <FaCalendarAlt size={20} className="info-icon" />
                                    <p className="info-text">{aEvent.date}</p>
                                </div>
                                <div className="event-info-item">
                                    <MdAccessTimeFilled size={20} className="info-icon" />
                                    <p className="info-text">{aEvent.time}</p>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6 col-lg-3 event-info-col">
                                <div className="event-info-item">
                                    <FaMapMarkerAlt size={20} className="info-icon" />
                                    <p className="info-text">{aEvent.venue}</p>
                                </div>
                                <div className="event-info-item">
                                    <FaLanguage size={20} className="info-icon" />
                                    <p className="info-text">{aEvent.language}</p>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6 col-lg-3 event-info-col">
                                <div className="event-info-item">
                                    <AiFillLike size={20} className="info-icon" />
                                    <p className="info-text">Votes: {aEvent.votes}</p>
                                </div>
                                <div className="event-info-item">
                                    <TbTimeDuration30 size={20} className="info-icon" />
                                    <p className="info-text">{aEvent.duration}</p>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6 col-lg-3 social-icons-col">
                                <div className="social-icons">
                                    <FaFacebookF className="social-icon" />
                                    <FaTwitter className="social-icon" />
                                    <FaPinterestP className="social-icon" />
                                    <FaInstagram className="social-icon" />
                                </div>
                            </div>
                        </div>

                        <div className="booking-section">
                            <div className="price-info">
                                <h4 className="price">&#8377; {aEvent.price}</h4>
                                <h6 className="availability">Available</h6>
                            </div>
                            <button 
                                onClick={eventBooking} 
                                className="book-btn primary-btn"
                            >
                                BOOK TICKETS
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Details */}
            <div className="event-details-section">
                <div className="container">
                    <div className="row event-details-row">
                        <div className="col-12 col-lg-6 event-content-col">
                            <h3 className="section-subtitle">Join Our Event</h3>
                            <h1 className="event-title">{aEvent.name}</h1>
                            <p className="event-category">{aEvent.category}</p>
                            <p className="event-description">{aEvent.description}</p>
                            <button 
                                onClick={eventBooking} 
                                className="book-btn secondary-btn"
                            >
                                Book Tickets
                            </button>
                            <div className="terms-section">
                                <h3 
                                    className="terms-link" 
                                    onClick={() => setModalShow(true)}
                                >
                                    Terms & Conditions 
                                    <FaGreaterThan className="terms-arrow" />
                                </h3>
                                <MyVerticallyCenteredModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 event-image-col">
                            <div className="event-image-wrapper">
                                <img 
                                    className="event-main-image" 
                                    src={aEvent.evtImg} 
                                    alt={aEvent.name || "Event Image"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Photo Gallery */}
            {aEvent.evtPics && aEvent.evtPics.length > 0 && (
                <div className="gallery-section">
                    <div className="container-fluid">
                        <div className="collage-gallery">
                            {aEvent.evtPics.map((img, index) => (
                                <div key={index} className={`collage-item collage-item-${index + 1}`}>
                                    <img src={img} alt={`Gallery ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewEvent;