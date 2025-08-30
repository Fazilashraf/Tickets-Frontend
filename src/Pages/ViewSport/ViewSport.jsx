import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaFacebookF, FaTwitter, FaPinterestP, FaInstagram } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { getASportAPI } from '../../Services/allAPI';
import Modal from 'react-bootstrap/Modal';
import { MdAccessTimeFilled } from "react-icons/md";
import { FaLanguage } from "react-icons/fa";
import { TbTimeDuration30 } from "react-icons/tb";
import { AiFillLike } from "react-icons/ai";
import { FaGreaterThan } from "react-icons/fa6";
import Button from 'react-bootstrap/Button';
import { PiSeatFill } from "react-icons/pi";
import './ViewSport.css';

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
                        1. Under these terms, reference to "Organiser(s)" shall mean and include organizer of the Match and their representatives, and reference to "Holder" shall mean the bonafide holder of this Ticket. <br />
                        2. This Ticket entitles the Holder to attend the stadium ("Stadium") in respect of the match ("Match"), details of which are referred to on the Ticket. <br />
                        3. This Ticket must be produced by the Holder at the time of entry into the Stadium. <br />
                        4. Children of two (2) years of age or over must have their own Ticket and all persons under eighteen (18) years of age must be accompanied by and under the constant supervision of an adult who also has a Ticket for the Match. <br />
                        5. Bags (including backpacks, laptop bags and suitcases), laptops, cameras, selfie sticks, umbrellas, bottles, lighters, tins or cans, whistles, water balloons, eggs, offensive banners or posters, flammable, toxic, illegal or hazardous substances, tobacco or tobacco products, metal containers, firecrackers, fireworks (including flares), weapons (including Swiss army knives and similar instruments), helmets, megaphones, loud hailers, animals (except guide dogs), and any other article which might endanger or unduly annoy any other person, are restricted/disallowed inside the Stadium. <br />
                        6. No item, including without limitation clothing, caps, banners or flags etc., displaying commercial logos, which, in the Organiser's view, conflicts with or in any way detracts from the rights of any official sponsor related to the Match, and/or any such items which, in the Organiser's view, constitute "ambush marketing", will be allowed into the Stadium. <br />
                        7. Entry will be refused if the barcode has been tampered with or if this Ticket has been torn, defaced, damaged or tampered with in any way. <br />
                        8. Foul, abusive or any form of discriminatory language (whether on the grounds of race, sex, religion or otherwise), unruly language or any unruly or threatening behaviour will not be tolerated at the Stadium prior to, during or after the Match and will result in denial of entry to or ejection from the Stadium and possible further action as per applicable law. <br />
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className="btn-responsive">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ViewSport() {

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

    // Countdown logic
    const calculateTimeLeft = () => {
        const difference = +new Date(aSport.ucDate) - +new Date();
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

    const sportBooking = () => {
        navigate(`/sCheckout/${id}`)
        scrollTo(0, 0)
    }

    return (
        <div className="view-sport-container">
            {/* Title Banner */}
            <div className="banner-container">
                <img 
                    className="banner-image"
                    src={aSport.bannerImg}
                    alt={aSport.name || "Sport Banner"}
                />
                <div className="banner-overlay">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6">
                                <h1 className="banner-title text-center">
                                    {aSport.name}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Countdown & Sport Info */}
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

                        <div className="row sport-info-row">
                            <div className="col-12 col-sm-6 col-lg-3 sport-info-col">
                                <div className="sport-info-item">
                                    <FaCalendarAlt size={20} className="info-icon" />
                                    <p className="info-text">{aSport.date}</p>
                                </div>
                                <div className="sport-info-item">
                                    <MdAccessTimeFilled size={20} className="info-icon" />
                                    <p className="info-text">{aSport.time}</p>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6 col-lg-3 sport-info-col">
                                <div className="sport-info-item">
                                    <FaMapMarkerAlt size={20} className="info-icon" />
                                    <p className="info-text">{aSport.venue}</p>
                                </div>
                                <div className="sport-info-item">
                                    <FaLanguage size={20} className="info-icon" />
                                    <p className="info-text">{aSport.language}</p>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6 col-lg-3 sport-info-col">
                                <div className="sport-info-item">
                                    <AiFillLike size={20} className="info-icon" />
                                    <p className="info-text">Votes: {aSport.votes}</p>
                                </div>
                                <div className="sport-info-item">
                                    <TbTimeDuration30 size={20} className="info-icon" />
                                    <p className="info-text">{aSport.duration}</p>
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
                                <h4 className="price">&#8377; {aSport.price}</h4>
                                <h6 className="availability">Available</h6>
                            </div>
                            <button 
                                onClick={sportBooking} 
                                className="book-btn sport-primary-btn"
                            >
                                BOOK TICKETS
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sport Details */}
            <div className="sport-details-section">
                <div className="container">
                    <div className="row sport-details-row">
                        <div className="col-12 col-lg-6 sport-content-col">
                            <h3 className="section-subtitle">Attend Our Sport Match</h3>
                            <h1 className="sport-title">{aSport.name}</h1>
                            <p className="sport-category">{aSport.category}</p>
                            <p className="sport-description">{aSport.description}</p>
                            <button 
                                onClick={sportBooking} 
                                className="book-btn sport-secondary-btn"
                            >
                                Book Tickets
                            </button>

                            <div className="facilities-section">
                                <h3 className="facilities-title">Facilities</h3>
                                <div className="facility-item">
                                    <div className="facility-icon">
                                        <PiSeatFill />
                                    </div>
                                    <h4 className="facility-text">Free Seating</h4>
                                </div>
                            </div>

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
                        
                        <div className="col-12 col-lg-6 sport-image-col">
                            <div className="sport-image-wrapper">
                                <img 
                                    className="sport-main-image" 
                                    src={aSport.sptImg} 
                                    alt={aSport.name || "Sport Image"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewSport