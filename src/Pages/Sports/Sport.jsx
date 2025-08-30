import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { getAllSportsAPI } from '../../Services/allAPI';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import './Sport.css'; // Import external CSS file

function Sport() {

    const [allSports, setAllSports] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false); // for mobile toggle

    const navigate = useNavigate()

    useEffect(() => {
        getAllSports();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const getAllSports = async () => {
        try {
            const response = await getAllSportsAPI()
            console.log(response);
            setAllSports(response.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    const viewSport = (id) => {
        if (sessionStorage.getItem("token")) {
            navigate(`/viewSport/${id}`);
            scrollTo(0, 0)
        } else {
            alert("Please Login");
        }
    };

    const filteredSports = allSports
        .filter(sport => {
            const matchesSearch = sport.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || sport.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    window.scrollTo({ top: 250, behavior: 'smooth' });

    const sportsPerPage = 4;
    const indexOfLastEvent = currentPage * sportsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - sportsPerPage;
    const currentSports = filteredSports.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalPages = Math.ceil(filteredSports.length / sportsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="sports-container">
            {/* Title Banner */}
            <div className="hero-banner position-relative">
                <img
                    className="hero-image w-100"
                    src="https://t4.ftcdn.net/jpg/02/81/19/63/360_F_281196319_iBmjqY4MlEndZ0HsA6nDjrkjYfbwRTPz.jpg"
                    alt="Sports Banner"
                />
                <div className="hero-overlay position-absolute">
                    <div className="hero-content text-center text-light px-3">
                        <h1 className="hero-title">
                            BUY <span className="text-accent">SPORTS</span> TICKETS
                        </h1>
                        <p className="hero-subtitle">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container-fluid px-0">
                <div className="row g-0">

                    {/* Mobile Filter Toggle */}
                    <div className="d-block d-lg-none mt-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="btn btn-light ms-4"
                        >
                            {showFilters ? <FaTimes /> : <FaBars />}
                            <span className="ms-2">{showFilters ? 'Close Categories' : 'Show Categories'}</span>
                        </button>
                    </div>

                    {/* Categories Sidebar */}
                    <div className={`col-12 col-lg-2 ms-4 ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
                        <div className="sidebar-wrapper p-3">
                            <div className="categories-card">
                                <h3 className="categories-title text-center mb-4">Categories</h3>
                                <div className="categories-list">
                                    {["All", "Football", "Cricket", "Volleyball", "Basketball", "Hockey", "Table Tennis", "Golf", "Chess"].map(category => (
                                        <button
                                            key={category}
                                            className={`category-btn btn text-light w-100 mb-2 ${selectedCategory === category ? 'active' : ''}`}
                                            onClick={() => {
                                                setSelectedCategory(category);
                                                setCurrentPage(1);
                                                setShowFilters(false); // close sidebar on mobile
                                            }}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-image d-none d-lg-block mt-4">
                                <img
                                    className="w-100 rounded"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbArm7A0mElIKBuckVfPhpgoVASnkU8l2mOQ&s"
                                    alt="Sports"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="col-10 col-lg-9 ms-2">
                        <div className="main-content p-4 ms-4">
                            {/* Search Section */}
                            <div className="search-section mb-4">
                                <div className="row align-items-center g-2">
                                    <div className="col-12 col-md-2">
                                        <h4 className="section-title mb-0">All Sports</h4>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <input
                                            className="form-control search-input"
                                            type="search"
                                            placeholder="Search For Events"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sports Cards */}
                            <div className="row g-4">
                                {currentSports.map((Sport, index) => (
                                    <div key={index} className="col-12 col-sm-6 col-xl-6">
                                        <div className="sport-card">
                                            <div className="sport-date">
                                                <button className="date-badge">{Sport.date}</button>
                                            </div>

                                            <div className="sport-image-container">
                                                <img
                                                    src={Sport.sptImg}
                                                    alt="Sport Event"
                                                    className="sport-image"
                                                    onClick={() => viewSport(Sport._id)}
                                                />
                                            </div>

                                            <div className="sport-details text-light text-center">
                                                <h4 className="sport-name">{Sport.name}</h4>
                                                <p className="sport-venue">
                                                    <FaLocationDot className="me-1" />
                                                    {Sport.venue}
                                                </p>
                                                <div className="sport-footer d-flex justify-content-between align-items-center">
                                                    <h3 className="sport-price mb-0">&#8377; {Sport.price}</h3>
                                                    <p className="sport-votes mb-0">
                                                        <FaShoppingCart className="me-1" />
                                                        {Sport.votes}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="pagination-wrapper d-flex justify-content-center mt-4">
                                <div className="pagination-controls d-flex flex-wrap justify-content-center gap-2">
                                    <button
                                        className="btn btn-outline-light pagination-btn"
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                    >
                                        Prev
                                    </button>

                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            className={`btn btn-outline-light pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                            onClick={() => paginate(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                    <button
                                        className="btn btn-outline-light pagination-btn"
                                        onClick={nextPage}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Sport
