import React, { useEffect, useRef, useState } from 'react'
import './ViewMovie.css'
import { SlCalender } from "react-icons/sl";
import { CiTimer } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { addReviewsAPI, getAllMoviesAPI, getAMovieAPI } from '../../Services/allAPI';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ViewMovie() {

    const [aMovie, setAMovie] = useState({
        reviews: [],
        movPics: [],
        cast: [],
        genre: [],
        movieDate:[]
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

    const { id } = useParams()

    const [reviews, setReviews] = useState({
        username: '', comment: '', rating: ''
    })

    const navigate = useNavigate()

    const handleReview = async () => {
        if (!reviews.username || !reviews.comment || !reviews.rating) {
            toast.warning('Please fill all fields', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }

        const res = await addReviewsAPI(id, reviews)
        if (res.status === 200) {
            toast.success("Review Added Successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            fetchMovie()  // refresh movie data to show new review
            setReviews({ username: '', comment: '', rating: '' })
        }

    }

    useEffect(() => {
        const container = document.getElementById('loop-carousel');

        const autoScroll = setInterval(() => {
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
                container.scrollTo({ left: 0, behavior: 'smooth' });  // Reset to start
            } else {
                container.scrollBy({ left: 320, behavior: 'smooth' });
            }
        }, 2500);

        return () => clearInterval(autoScroll);
    }, []);


    const extractVideoID = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const [showTrailer, setShowTrailer] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState("");

    const openTrailer = (url) => {
        setTrailerUrl(url);
        setShowTrailer(true);
    };

    const [selected, setSelected] = useState(null);
    const scrollRef = useRef(null);

    const handleSelect = (index) => {
        setSelected(index);
    };

    const onBookHandler = () => {
        if (selected==null) {
            return toast.warning("Please Select a Date", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        const selectedDateValue = aMovie.movieDate[selected];
        navigate(`/seatPlan/${id}`, { state: { selectedDate: selectedDateValue } });
        scrollTo(0, 0)
    }

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -100,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 100,
                behavior: 'smooth'
            });
        }
    };

    const [allMovies, setAllMovies] = useState([])
    const [relatedMovies, setRelatedMovies] = useState([]);

    const getAllMovies = async () => {
        try {
            const response = await getAllMoviesAPI()
            console.log(response);
            setAllMovies(response.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllMovies();
    }, []);

    useEffect(() => {
        if (allMovies.length > 0 && aMovie.genre.length > 0) {
            const filtered = allMovies.filter(movie =>
                movie._id !== aMovie._id &&
                movie.genre.some(g => aMovie.genre.includes(g))
            );
            setRelatedMovies(filtered.slice(0,4));
        }
    }, [allMovies, aMovie]);

    const seeMoreMovies = () => {
        navigate('/movies')
    }


    return (
        <>
            <div>
                {/* Hero Section with Banner */}
                <div className="position-relative">
                    <img 
                        style={{ filter: 'brightness(60%)' }} 
                        width={'100%'} 
                        height={420} 
                        src={aMovie.bannerImg} 
                        alt="Movie Banner" 
                    />

                    <div>
                        <div className="p-5 d-flex">
                            {/* Trailer Div */}
                            <div className="hero-poster-section position-absolute">
                                <div className="hero-poster-wrapper p-3 rounded">
                                    <img className="hero-poster" src={aMovie.movImg} alt="Movie Poster" />
                                </div>
                                <div className="hero-play-button position-absolute">
                                    <button
                                        onClick={() => {
                                            const videoID = extractVideoID(aMovie.trailer);
                                            if (videoID) {
                                                openTrailer(`https://www.youtube.com/embed/${videoID}`);
                                            } else {
                                                alert("Trailer link is invalid!");
                                            }
                                        }}
                                        className="button-with-icon">
                                        <svg
                                            className="icon"
                                            id="Play"
                                            viewBox="0 0 48 48"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                className="color000000 svgShape"
                                                fill="#ffffff"
                                                d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                                            ></path>
                                        </svg>
                                        <span className="text">Play</span>
                                    </button>
                                </div>
                            </div>

                            {/* Movie Info Section */}
                            <div className="hero-info-section position-absolute text-light">
                                <h2>{aMovie.name}</h2>
                                <button className='border text-light btn p-2 rounded mt-3'>{aMovie.genre[0]} | {aMovie.genre[1]} | {aMovie.genre[2]}</button>
                                <div className="mt-4">
                                    <div className='d-flex hero-meta-info'>
                                        <h5><SlCalender className='me-1 mb-1' /> {aMovie.date}</h5>
                                        <h5><CiTimer className='me-1 mb-1 ms-3' /> {aMovie.duration}</h5>
                                    </div>

                                    {/* Social Icons */}
                                    <div className="hero-social-section position-absolute">
                                        <ul className="wrapper">
                                            <li className="icon facebook">
                                                <span className="tooltip">Facebook</span>
                                                <svg
                                                    viewBox="0 0 320 512"
                                                    height="1.2em"
                                                    fill="currentColor"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                                    ></path>
                                                </svg>
                                            </li>
                                            <li className="icon twitter">
                                                <span className="tooltip">Twitter</span>
                                                <svg
                                                    height="1.8em"
                                                    fill="currentColor"
                                                    viewBox="0 0 48 48"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="twitter"
                                                >
                                                    <path
                                                        d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
                                                    ></path>
                                                </svg>
                                            </li>
                                            <li className="icon instagram">
                                                <span className="tooltip">Instagram</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="1.2em"
                                                    fill="currentColor"
                                                    className="bi bi-instagram"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                                    ></path>
                                                </svg>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="hero-stats-bar position-absolute">
                    <div className='hero-stats-container d-flex justify-content-around p-3 text-light rounded'>
                        <div className='d-flex mt-2'>
                            <FaCartShopping className='mt-1 fs-5' />
                            <p className='ms-2 fs-5'>{aMovie.bookedCount}</p>
                        </div>
                        <div className='d-flex ms-4 mt-2'>
                            <FaRegStarHalfStroke className='mt-1 fs-5' />
                            <p className='ms-2 fs-5'>{aMovie.rating}</p>
                        </div>
                        <div className='d-flex ms-4 mt-2'>
                            <AiOutlineLike className='mt-1 fs-5' />
                            <p className='ms-2 fs-5'>{aMovie.votes}</p>
                        </div>
                        <a href="#dateSelect">
                            <button className='btn btn-light text-dark ms-5 h-100 hero-book-btn'>
                                Book Tickets
                            </button>
                        </a>
                    </div>
                </div>

                {/* Main Content */}
                <div className="main-content mt-4">
                    <div className="container">
                        <div className="row text-light">
                            {/* Left Column - Photos, Description, Reviews */}
                            <div className="col-12 col-lg-8 mb-5 photos-section">
                                {/* Photos Section */}
                                <h2 className='text-light mb-4'>Photos</h2>
                                <div className="photos-grid row g-3 mb-5">
                                    <div className="col-12 col-md-4">
                                        <div className="photo-container p-2 rounded">
                                            <img className="w-100 h-100 object-fit-cover" src={aMovie.movPics[0]} alt="Movie Photo 1" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="photo-container p-2 rounded">
                                            <img className="w-100 h-100 object-fit-cover" src={aMovie.movPics[1]} alt="Movie Photo 2" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="photo-container p-2 rounded">
                                            <img className="w-100 h-100 object-fit-cover" src={aMovie.movPics[2]} alt="Movie Photo 3" />
                                        </div>
                                    </div>
                                </div>

                                {/* Description Section */}
                                <h4 className='mb-3'>Description</h4>
                                <hr />
                                <h3 className="mb-3">{aMovie.name}</h3>
                                <p className='mb-5'>{aMovie.description}</p>

                                {/* Reviews Section */}
                                <h4 className='mb-3'>Reviews</h4>
                                <hr />
                                <div className="reviews-container mb-4">
                                    {aMovie.reviews.map((review, index) => (
                                        <div key={index} className='review-item d-flex flex-column flex-sm-row mb-4 p-3 rounded'>
                                            <img 
                                                className="review-avatar rounded-circle mb-3 mb-sm-0 me-sm-3 align-self-center align-self-sm-start" 
                                                src="https://www.pfpgeeks.com/static/images/black-pfp/webp/black-pfp-5.webp" 
                                                alt="User Avatar" 
                                            />
                                            <div className='flex-grow-1 text-center text-sm-start'>
                                                <h4>{review.username}</h4>
                                                <p className="mb-2">{review.comment}</p>
                                            </div>
                                            <div className='d-flex align-items-center justify-content-center justify-content-sm-start'>
                                                <FaStar className='text-danger me-1' />
                                                <span>{review.rating}/10</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Write Review Section */}
                                <div className="write-review-section">
                                    <h4 className='mb-3 text-light'>Write a Review</h4>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <input
                                                className='form-control bg-black text-light'
                                                type="text"
                                                placeholder='Your Name'
                                                value={reviews.username}
                                                onChange={e => setReviews({ ...reviews, username: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <textarea
                                                placeholder='Comment Here'
                                                className='form-control bg-black text-light'
                                                rows="4"
                                                value={reviews.comment}
                                                onChange={e => setReviews({ ...reviews, comment: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input
                                                type="number"
                                                className='form-control bg-black text-light'
                                                placeholder='Rating (1-10)'
                                                max="10"
                                                min="1"
                                                value={reviews.rating}
                                                onChange={e => setReviews({ ...reviews, rating: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button onClick={handleReview} className='btn btn-success'>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Offers */}
                            <div className="col-12 col-lg-4">
                                <h2 className='text-light text-center mb-4'>Today's Offers</h2>

                                <div className="offers-container">
                                    <div className='offer-card p-3 mb-4 text-light rounded'>
                                        <img className="w-100 mb-3" src="https://themes.themewild.com/ticket/assets/img/sidebar/offer-1.png" alt="Offer 1" />
                                        <h5 className='mb-2'>Brand Card Cashback Offer</h5>
                                        <p className='text-primary mb-0'>It is a long established fact that a reader will be distracted</p>
                                    </div>

                                    <div className='offer-card p-3 mb-4 text-light rounded'>
                                        <img className="w-100 mb-3" src="https://themes.themewild.com/ticket/assets/img/sidebar/offer-2.png" alt="Offer 2" />
                                        <h5 className='mb-2'>Online Payment Offer</h5>
                                        <p className='text-primary mb-0'>It is a long established fact that a reader will be distracted</p>
                                    </div>

                                    <div className='offer-card p-3 mb-4 text-light rounded'>
                                        <img className="w-100 mb-3" src="https://themes.themewild.com/ticket/assets/img/sidebar/offer-3.png" alt="Offer 3" />
                                        <h5 className='mb-2'>Bank Payment Cashback Offer</h5>
                                        <p className='text-primary mb-0'>It is a long established fact that a reader will be distracted</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Movie Cast Section */}
                <div className="cast-section container mb-5">
                    <div className="text-center mb-5">
                        <h2 className='text-light'>Movie Cast</h2>
                    </div>
                    <div className="cast-carousel-container position-relative">
                        <div
                            id="loop-carousel"
                            className="cast-carousel d-flex overflow-auto"
                        >
                            {aMovie.cast.map((cast, index) => (
                                <div key={index} className="cast-card flex-shrink-0 me-3">
                                    <img
                                        src={cast.image}
                                        alt={cast.name}
                                        className="cast-image w-100"
                                    />
                                    <div className="cast-info p-3 text-light">
                                        <h5 className="mb-1">{cast.name}</h5>
                                        <p className="mb-0">{cast.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Carousel Navigation */}
                        <button
                            className="carousel-nav carousel-nav-prev position-absolute"
                            onClick={() => {
                                document.getElementById('loop-carousel').scrollBy({ left: -320, behavior: 'smooth' });
                            }}
                        >
                            ‹
                        </button>

                        <button
                            className="carousel-nav carousel-nav-next position-absolute"
                            id="dateSelect"
                            onClick={() => {
                                document.getElementById('loop-carousel').scrollBy({ left: 320, behavior: 'smooth' });
                            }}
                        >
                            ›
                        </button>
                    </div>
                </div>

                {/* Date Selection Section */}
                <div className="date-selection-section mb-5" >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-10">
                                <div className="date-selection-card p-4 text-white rounded">
                                    <div className="row align-items-center">
                                        <div className="col-12 col-lg-8 mb-3 mb-lg-0">
                                            <h5 className="mb-3 text-center text-lg-start">Choose Date</h5>
                                            <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                <button className="btn btn-outline-light me-2 d-none d-sm-block" onClick={scrollLeft}>
                                                    <FaChevronLeft />
                                                </button>

                                                <div
                                                    ref={scrollRef}
                                                    className="date-scroll-container d-flex overflow-auto flex-nowrap"
                                                >
                                                    {aMovie.movieDate.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => handleSelect(index)}
                                                            className={`date-item text-center px-3 py-2 rounded mx-1 ${
                                                                selected === index ? 'bg-danger text-white' : 'text-white'
                                                            }`}
                                                        >
                                                            <div className="date-day">{item.day}</div>
                                                            <div className="date-month">{item.month}</div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button className="btn btn-outline-light ms-2 d-none d-sm-block" onClick={scrollRight}>
                                                    <FaChevronRight />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-4 text-center">
                                            <button onClick={onBookHandler} className="btn btn-danger btn-lg w-75 mt-4 w-lg-auto">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Movies Section */}
                <div className="related-movies-section container text-light mb-5">
                    <h4 className="mb-4">You May Also Like</h4>
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-10">
                            <div className="row g-3">
                                {relatedMovies.map((movie, index) => (
                                    <div key={index} className="col-10 col-md-7 col-lg-3">
                                        <div className="related-movie-card p-2 rounded h-100">
                                            <div className="text-center mb-3">
                                                <button className='btn text-light small'>{movie.date}</button>
                                            </div>
                                            <div className="related-movie-image text-center mb-3">
                                                <img 
                                                    className="related-movie-poster" 
                                                    src={movie.movImg} 
                                                    alt={movie.name} 
                                                />
                                            </div>
                                            <div className="text-center">
                                                <h4>{movie.name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-12 col-lg-2 text-center mt-4 mt-lg-0">
                            <button 
                                onClick={seeMoreMovies} 
                                className='btn btn-light see-more-btn'
                            >
                                See More
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Trailer Modal */}
            {showTrailer && (
                <div className="trailer-modal">
                    <div className="trailer-content">
                        <span className="close-button" onClick={() => setShowTrailer(false)}>&times;</span>
                        <div className="trailer-video-container">
                            <iframe
                                className="trailer-video"
                                src={trailerUrl}
                                title="YouTube Trailer"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

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
        </>
    )
}

export default ViewMovie