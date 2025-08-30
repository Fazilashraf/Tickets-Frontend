import React, { useState } from 'react'
import './Movie.css'
import { FaCartShopping } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaTicket } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { getAllMoviesAPI } from '../../Services/allAPI';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Movie() {

  const [allMovies, setAllMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("") 
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    getAllMovies();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 250, behavior: 'smooth' });
  }, [currentPage]);

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

  const viewMovie = (id) => {
    if (sessionStorage.getItem("token")) {
      navigate(`/viewMovie/${id}`);
      scrollTo(0, 0)
    } else {
      alert("Please Login");
    }
  };

  const filteredMovies = allMovies
    .filter(movie => {
      const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || movie.genre.includes(selectedCategory);
      const matchesExperience = selectedExperience === "All" || movie.screen.includes(selectedExperience);
      return matchesSearch && matchesCategory && matchesExperience;
    })
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });


  const moviesPerPage = 2;
  // Get current events
  const indexOfLastEvent = currentPage * moviesPerPage;
  const indexOfFirstEvent = indexOfLastEvent - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstEvent, indexOfLastEvent);

  // Calculate total pages
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const extractVideoID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const openTrailer = (url) => {
    setTrailerUrl(url);
    setShowTrailer(true);
  };

  return (
    <div className="movie-page">
      {/* Title Banner */}
      <div className="bannerr-container">
        <img 
          style={{ filter: 'brightness(50%)' }} 
          width={'100%'} 
          height={300} 
          src="https://t3.ftcdn.net/jpg/05/00/81/96/360_F_500819621_7bRfuKkKyaRYU6aJ1Sa9RBCPdscka6Iq.jpg" 
          alt="" 
          className="bannerr-image"
        />

        <div className="bannerr-content">
          <h1 className="bannerr-title">BUY <span style={{ color: 'rgb(106, 219, 181)' }}>MOVIE</span> TICKETS</h1>
          <p className="bannerr-text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        </div>
      </div>

      {/* Categories */}
      <div className="row main-content ms-2">
        {/* Mobile Filter Toggle */}
        <div className="d-block d-lg-none p-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-light mobile-filter-toggle ms-4"
          >
            {showFilters ? <FaTimes /> : <FaBars />}
            <span className="ms-2">{showFilters ? 'Close Filters' : 'Show Filters'}</span>
          </button>
        </div>

        {/* Sidebar - Filters */}
        <div className={`col-12 col-lg-2 ms-3 sidebar ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
          <div className='p-3 mt-3 text-light'>
            <h3 className='text-center text-lg-start ms-4'>GENRE</h3>
            <ul className='filter-grid me-4' style={{ listStyle: 'none' }}>
              {["All", "Action", "Horror", "Animation", "Sci-Fi", "Thriller", "Comedy", "Romantic", "Drama", "Adventure", "Anime", "Supernatural"].map(genre => (
                <li key={genre}>
                  <button
                    className={`btn btn-outline-light mt-2 w-100 filter-btn ${selectedCategory === genre ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(genre);
                      setCurrentPage(1);
                      setShowFilters(false);
                    }}
                  >
                    {genre}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className='p-3 mt-3 text-light'>
            <h3 className='text-center text-lg-start'>Experience</h3>
            <ul className='filter-grid me-4' style={{ listStyle: 'none' }}>
              {["All", "2D", "3D", "4DX", "IMAX", "ICE 3D"].map(screen => (
                <li key={screen}>
                  <button
                    className={`btn btn-outline-light mt-2 w-100 filter-btn ${selectedExperience === screen ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedExperience(screen);
                      setCurrentPage(1);
                      setShowFilters(false);
                    }}
                  >
                    {screen}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-11 col-lg-9 p-3">
          {/* Search Bar */}
          <div className='d-flex flex-column flex-sm-row align-items-start align-items-sm-center search'>
            <h4 className='mt-3 text-search-title ms-4' style={{ color: 'cyan' }}>All Movies</h4>
            <input 
              className='form-control mt-2 search-input w-100 ms-4' 
              type="search" 
              placeholder='Search For Movies' 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          {/* Movie Lists */}
          <div className="mt-4">
            {
              currentMovies.map((movie, index) => (
                <div key={movie._id || index} style={{ backgroundColor: 'rgb(16, 44, 112)' }} className="row shadow rounded mt-4 ms-4 movie-card">
                  <div className="col-12 col-md-4 movie-image-container">
                    <img 
                      style={{ cursor: 'pointer' }} 
                      onClick={() => viewMovie(movie._id)} 
                      src={movie.movImg} 
                      alt={movie.name}
                      className="movie-image"
                    />
                  </div>
                  <div className="col-12 col-md-8 p-5 p-md-3 text-light movie-details">
                    <h2 className="movie-title">{movie.name}</h2>
                    <div className='mb-2 movie-badges'>
                      <button className='btn btn-outline-light me-2 mb-2'>{movie.screen}</button>
                      <button className='btn btn-outline-light mb-2'>{movie.language}</button>
                    </div>
                    <p className='mt-3'>{movie.duration}</p>
                    <h5>{movie.genre[0]} | {movie.genre[1]} | {movie.genre[2]}</h5>
                    <h6 className='mt-3'>Release Date : {movie.date}</h6>
                    <div className='d-flex flex-wrap mt-3 movie-stats'>
                      <div className='d-flex align-items-center me-4 mb-2'>
                        <FaCartShopping className='me-2' />
                        <p className='mb-0'>{movie.bookedCount}</p>
                      </div>
                      <div className='d-flex align-items-center mb-2'>
                        <FaRegStarHalfStroke className='me-2' />
                        <p className='mb-0'>{movie.rating}</p>
                      </div>
                    </div>
                    <hr />
                    <div className='movie-actions'>
                      <div className='d-flex flex-column flex-sm-row align-items-start align-items-sm-center'>
                        <div className='d-flex align-items-center me-4 mb-3 mb-sm-0'>
                          <label style={{ fontSize: '10px' }} className="like-container me-2">
                            <input type="checkbox" />
                            <div className="checkmark">
                              <svg
                                viewBox="0 0 50 50"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon"
                              >
                                <path d="M 24.10 6.29 Q 28.34 7.56 28.00 12.00 Q 27.56 15.10 27.13 18.19 A 0.45 0.45 4.5 0 0 27.57 18.70 Q 33.16 18.79 38.75 18.75 Q 42.13 18.97 43.23 21.45 Q 43.91 22.98 43.27 26.05 Q 40.33 40.08 40.19 40.44 Q 38.85 43.75 35.50 43.75 Q 21.75 43.75 7.29 43.75 A 1.03 1.02 0.0 0 1 6.26 42.73 L 6.42 19.43 A 0.54 0.51 -89.4 0 1 6.93 18.90 L 14.74 18.79 A 2.52 2.31 11.6 0 0 16.91 17.49 L 22.04 7.17 A 1.74 1.73 21.6 0 1 24.10 6.29 Z M 21.92 14.42 Q 20.76 16.58 19.74 18.79 Q 18.74 20.93 18.72 23.43 Q 18.65 31.75 18.92 40.06 A 0.52 0.52 88.9 0 0 19.44 40.56 L 35.51 40.50 A 1.87 1.83 5.9 0 0 37.33 39.05 L 40.51 23.94 Q 40.92 22.03 38.96 21.97 L 23.95 21.57 A 0.49 0.47 2.8 0 1 23.47 21.06 Q 23.76 17.64 25.00 12.00 Q 25.58 9.36 24.28 10.12 Q 23.80 10.40 23.50 11.09 Q 22.79 12.80 21.92 14.42 Z M 15.57 22.41 A 0.62 0.62 0 0 0 14.95 21.79 L 10.01 21.79 A 0.62 0.62 0 0 0 9.39 22.41 L 9.39 40.07 A 0.62 0.62 0 0 0 10.01 40.69 L 14.95 40.69 A 0.62 0.62 0 0 0 15.57 40.07 L 15.57 22.41 Z" fillOpacity="1.000"></path>
                                <circle r="1.51" cy="37.50" cx="12.49" fillOpacity="1.000"></circle>
                              </svg>
                            </div>
                            <p className="like">Liked!</p>
                          </label>
                          <p className='mb-0'>{movie.votes}</p>
                        </div>

                        {/* Ticket Booking */}
                        <div className='d-flex align-items-center me-4 mb-3 mb-sm-0'>
                          <FaTicket className='me-2' />
                          <a
                            onClick={() => {
                              viewMovie(movie._id);
                            }}
                            href="#"
                            className="ticket-link"
                          >
                            <p style={{ color: 'cyan' }} className='mb-0'>Book Ticket</p>
                          </a>
                        </div>

                        {/* Watch Trailer */}
                        <div className="d-flex">
                          <button
                            onClick={() => {
                              const videoID = extractVideoID(movie.trailer);
                              if (videoID) {
                                openTrailer(`https://www.youtube.com/embed/${videoID}`);
                              } else {
                                alert("Trailer link is invalid!");
                              }
                            }}
                            className="btn btn-outline-info d-flex align-items-center trailer-btn"
                            style={{ borderRadius: "20px", fontWeight: 500}}
                            title="Watch Movie Trailer"
                          >
                            <FaRegCirclePlay className="me-2" style={{ fontSize: "1.1rem" }} />
                            Watch Trailer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Pagination */}
          <div className='d-flex justify-content-center flex-wrap mt-4 pagination-container'>
            <button className='btn btn-outline-light me-2 mb-2' onClick={prevPage} disabled={currentPage === 1}>Prev</button>

            {
              [...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`btn btn-outline-light me-2 mb-2 ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))
            }

            <button className='btn btn-outline-light mb-2' onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
          </div>

        </div>
      </div>

      {/* Trailer Modal */}
      {
        showTrailer && (
          <div className="trailer-modal">
            <div className="trailer-content">
              <span className="close-button" onClick={() => setShowTrailer(false)}>&times;</span>
              <iframe
                width="100%"
                height="400"
                src={trailerUrl}
                title="YouTube Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Movie