import React, { useEffect, useState } from 'react'
import './Events.css'
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { getAllEventsAPI } from '../../Services/allAPI';
import { useNavigate } from 'react-router-dom';

function Events() {

  const [allEvents, setAllEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const getAllEvents = async () => {
    try {
      const response = await getAllEventsAPI()
      console.log(response);
      setAllEvents(response.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  const viewEvent = (id) => {
    if (sessionStorage.getItem("token")) {
      navigate(`/viewEvent/${id}`);
      scrollTo(0, 0)
    } else {
      alert("Please Login");
    }
  };

  const filteredEvents = allEvents
    .filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); 

  window.scrollTo({ top: 250, behavior: 'smooth' });

  const eventsPerPage = 4;
  // Get current events
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Calculate total pages
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="events-page">
      {/* Title Banner */}
      <div className="bannner-container">
        <img 
          style={{ filter: 'brightness(50%)' }} 
          width={'100%'} 
          height={300} 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnQlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D" 
          alt="" 
          className="bannner-image"
        />

        <div className="bannner-content">
          <h1 className="bannner-title">BUY <span style={{ color: 'rgb(106, 219, 181)' }}>EVENT</span> TICKETS</h1>
          <p className="bannner-text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        </div>
      </div>

      {/* Categories */}
      <div className="row main-content p-3">
        {/* Mobile Filter Toggle */}
        <div className="d-block d-lg-none mb-4 ms-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-light mobile-filter-toggle"
          >
            {showFilters ? <FaTimes /> : <FaBars />}
            <span className="ms-2">{showFilters ? 'Close Categories' : 'Show Categories'}</span>
          </button>
        </div>

        {/* Sidebar */}
        <div className={`col-12 col-lg-2 ms-3 sidebar ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
          <div style={{ backgroundColor: 'rgb(16, 44, 112)', borderRadius: '10px' }} className='categories-section p-4 mt-3 text-light'>
            <h3 className='text-center mb-4'>Categories</h3>
            <ul className='category-list' style={{ listStyle: 'none' }}>
              {["All", "Business", "Technology", "Magic Show", "Workshops", "Comedy Show", "Music Show", "Tv Shows", "Award Shows"].map(category => (
                <li key={category}>
                  <button
                    className={`btn btn-outline-light mt-2 w-100 category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                      setShowFilters(false);
                    }}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Promotional Images */}
          <div className='promo-images mt-3 d-none d-lg-block'>
            <div className="promo-image-container">
              <img 
                style={{ borderRadius: '10px' }} 
                width={285} 
                height={200} 
                src="https://plus.unsplash.com/premium_photo-1661306437817-8ab34be91e0c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnRzfGVufDB8fDB8fHww" 
                alt="" 
                className="promo-image"
              />
            </div>

            <div className="promo-image-container mt-3 mb-5">
              <img 
                style={{ borderRadius: '10px' }} 
                width={285} 
                height={200} 
                src="https://media.istockphoto.com/id/978975308/vector/upcoming-events-neon-signs-vector-upcoming-events-design-template-neon-sign-light-banner-neon.jpg?s=612x612&w=0&k=20&c=VMCoJJda9L17HVkFOFB3fyDpjC4Qu2AsyYn3u4T4F4c=" 
                alt="" 
                className="promo-image"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-11 col-lg-9 ms-4 p-1">
          {/* Search Bar */}
          <div className='d-flex flex-column flex-sm-row align-items-start align-items-sm-center search-section'>
            <h4 className='text-search-title mb-2 mb-sm-0 ms-3' style={{ color: 'cyan' }}>All Events</h4>
            <input 
              className='form-control search-input ms-2 w-100' 
              type="search" 
              placeholder='Search For Events' 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          {/* Event Lists */}
          <div className="events-grid">
            {
              currentEvents.map((events, index) => (
                <div key={events._id || index} className="event-card-wrapper">
                  <div className="event-card ms-3">
                    <div className="event-date-badge">
                      <button className='btn text-light date-btn'>{events.date}</button>
                    </div>
                    <div className="event-image-container rounded">
                      <img 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => viewEvent(events._id)} 
                        src={events.evtImg} 
                        alt="Event" 
                        className="event-image" 
                      />
                    </div>
                    <div className="event-details text-light">
                      <h4 className="event-name">{events.name}</h4>
                      <p className="event-venue">
                        <FaLocationDot className='mb-1 me-1' />
                        {events.venue}
                      </p>
                      <div className='d-flex justify-content-between align-items-center event-footer'>
                        <h3 className="event-price">&#8377; {events.price}</h3>
                        <p className='event-votes mb-0'>
                          <FaShoppingCart className='mb-1 me-1' />
                          {events.votes}
                        </p>
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
    </div>
  )
}

export default Events