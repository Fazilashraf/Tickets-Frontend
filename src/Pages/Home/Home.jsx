import React, { useEffect, useRef, useState } from 'react';
import './Home.css'
import { FaArrowRight } from "react-icons/fa";
import { getHomeEventsAPI, getHomeMoviesAPI, getHomeSportsAPI } from '../../Services/allAPI';
import { Link, useNavigate } from 'react-router-dom';
import { FaStarHalfAlt } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';

function Home() {

    const navigate = useNavigate()

    const [homeMovies, setHomeMovies] = useState([])

    const getHomeMovies = async () => {
        try {
            const response = await getHomeMoviesAPI()
            console.log(response);
            setHomeMovies(response.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getHomeMovies();
    }, []);

    const [homeEvents, setHomeEvents] = useState([])

    const getHomeEvents = async () => {
        try {
            const response = await getHomeEventsAPI()
            console.log(response);
            setHomeEvents(response.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getHomeEvents();
    }, []);

    const [homeSports, setHomeSports] = useState([])

    const getHomeSports = async () => {
        try {
            const response = await getHomeSportsAPI()
            console.log(response);
            setHomeSports(response.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getHomeSports();
    }, []);

    const viewMovie = (id) => {
        if (sessionStorage.getItem("token")) {
            navigate(`/viewMovie/${id}`);
            scrollTo(0,0)
        } else {
            toast.warning("Please Login", { position: "top-center", theme: "dark" });
        }
    };

    const viewEvent = (id) => {
        if (sessionStorage.getItem("token")) {
            navigate(`/viewEvent/${id}`);
            scrollTo(0,0)
        } else {
            toast.warning("Please Login", { position: "top-center", theme: "dark" });
        }
    };

    const viewSport = (id) => {
        if (sessionStorage.getItem("token")) {
            navigate(`/viewSport/${id}`);
            scrollTo(0,0)
        } else {
            toast.warning("Please Login", { position: "top-center", theme: "dark" });
        }
    };

    const words = ["EVENTS", "SPORTS", "MOVIES"];
    const wordElement = useRef(null); // Use ref to reference the DOM element
    const [currentWord, setCurrentWord] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [charIndex, setCharIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);

    const typingSpeed = 150; // Milliseconds for typing
    const erasingSpeed = 100; // Milliseconds for erasing
    const delayBetweenWords = 1000; // Delay before switching to the next word

    useEffect(() => {
        let timer;
        if (isTyping) {
            if (charIndex < words[wordIndex].length) {
                timer = setTimeout(() => {
                    setCurrentWord((prev) => prev + words[wordIndex][charIndex]);
                    setCharIndex((prev) => prev + 1);
                }, typingSpeed);
            } else {
                timer = setTimeout(() => setIsTyping(false), delayBetweenWords);
            }
        } else {
            if (charIndex > 0) {
                timer = setTimeout(() => {
                    setCurrentWord((prev) => prev.slice(0, -1));
                    setCharIndex((prev) => prev - 1);
                }, erasingSpeed);
            } else {
                setIsTyping(true);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        }
        return () => clearTimeout(timer); // Cleanup the timeout
    }, [charIndex, isTyping, words, wordIndex]);

    return (
        <div>
      {/* Banner */}
      <div className="position-relative text-center">
        <img
          id="BImg"
          src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM19zY2VuZV9vZl8zZF9pbGx1c3RyYXRpb25fbmVvbndpdGhvdXRfc2VtaS1yZV8xM2Q5OWIyOC0yN2NkLTQ1NDEtYTVmYy1lMzFkMjkxMTE4YTJfMS5qcGc.jpg"
          alt="Banner"
          className="img-fluid"
        />
        <div className="banner-text col-10 col-md-8 col-lg-5 mx-auto position-absolute top-50 start-50 translate-middle">
          <h1 className="text-light fw-bold display-5">
            TICKETS BOOKING FOR{' '}
            <span style={{ color: 'rgb(15, 220, 172)' }} ref={wordElement}>
              {currentWord}
            </span>
            <span className="cursor">|</span>
          </h1>
          <p className="fs-4 text-white">
            Buy Your Tickets Online And Enjoy Your Live Entertainment!
          </p>
        </div>
      </div>

      {/* Movies Section */}
      <div className="container section-container">
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-5">
          <h1 className="text-light mb-3">Movies</h1>
          <Link to="/movies">
            <button id="btnVM" className="btn border text-cyan">
              View More <FaArrowRight />
            </button>
          </Link>
        </div>
        <div className="row g-4 d-flex justify-content-around">
          {homeMovies.map((movie, index) => (
            <div className="col-12 col-sm-6 col-md-6 col-lg-3" key={index}>
              <div className="event-card p-3 h-100">
                <div className="text-light text-center">
                  <button className="btn btn-sm text-light">{movie.date}</button>
                </div>
                <div className="event-image-container">
                  <img
                    onClick={() => viewMovie(movie._id)}
                    src={movie.movImg}
                    alt={movie.name}
                    className="event-image"
                  />
                </div>
                <div className="event-details">
                  <h4>{movie.name}</h4>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p>
                      {movie.genre[0]} | {movie.genre[1]} | {movie.genre[2]}
                    </p>
                    <p>
                      <FaStarHalfAlt className="text-danger mb-1 me-1" />
                      {movie.rating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div className="section-container">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h1 className="text-light mb-3">Events</h1>
          <button
            onClick={() => {
              navigate('/events');
              scrollTo(0, 0);
            }}
            id="btnVM"
            className="btn border text-cyan"
          >
            View More <FaArrowRight />
          </button>
        </div>
        <div className="row g-4 d-flex justify-content-around">
          {homeEvents.map((event, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <div className="event-card p-3 h-100">
                <div className="text-light text-center">
                  <button className="btn btn-sm text-light">{event.date}</button>
                </div>
                <div className="event-image-container">
                  <img
                    onClick={() => viewEvent(event._id)}
                    src={event.evtImg}
                    alt={event.name}
                    className="event-image"
                  />
                </div>
                <div className="event-details">
                  <h5>{event.name}</h5>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p>{event.category}</p>
                    <p>
                      <AiFillLike className="text-danger mb-1 me-1" />
                      {event.votes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sports Section */}
      <div className="section-container">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h1 className="text-light mb-3">Sports</h1>
          <button
            onClick={() => {
              navigate('/sports');
              scrollTo(0, 0);
            }}
            id="btnVM"
            className="btn border text-cyan"
          >
            View More <FaArrowRight />
          </button>
        </div>
        <div className="row g-4 d-flex justify-content-around">
          {homeSports.map((sport, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <div className="event-card p-3 h-100">
                <div className="text-light text-center">
                  <button className="btn btn-sm text-light">{sport.date}</button>
                </div>
                <div className="event-image-container">
                  <img
                    onClick={() => viewSport(sport._id)}
                    src={sport.sptImg}
                    alt={sport.name}
                    className="event-image"
                  />
                </div>
                <div className="event-details">
                  <h5>{sport.name}</h5>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p>{sport.category}</p>
                    <p>
                      <AiFillLike className="text-danger mb-1 me-1" />
                      {sport.votes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="top-center" theme="dark" />
    </div>
    );
}

export default Home;