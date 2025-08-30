import React, { useState } from 'react'
import './About.css'
import { Link } from 'react-router-dom'
import { FaRegHandshake } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { TbUserScreen } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import { BsBuildings } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';

function AboutUs() {
    const [hoveredStat, setHoveredStat] = useState(null);

    const handleMouseEnter = (stat) => {
        setHoveredStat(stat);
    };

    const handleMouseLeave = () => {
        setHoveredStat(null);
    };

    return (
        <div>
            {/* Banner */}
            <div className="banner-container">
                <img
                    className="banner-img"
                    src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM19zY2VuZV9vZl8zZF9pbGx1c3RyYXRpb25fbmVvbndpdGhvdXRfc2VtaS1yZV8xM2Q5OWIyOC0yN2NkLTQ1NDEtYTVmYy1lMzFkMjkxMTE4YTJfMS5qcGc.jpg"
                    alt="About Us Banner"
                />
                <div className="banner-textt">
                    <h1 className="banner-titlee">ABOUT US</h1>
                    <h5 className="banner-breadcrumbb">Home &gt;&gt; About Us</h5>
                </div>
            </div>

            {/* Know More About Us */}
            <div className="about-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="about-content">
                                <h4 className="section-subtitle">ABOUT US</h4>
                                <h3 className="section-title">KNOW MORE ABOUT US</h3>
                                <p className="about-text">
                                    There are many variations of passages of Lorem Ipsum available. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.
                                </p>
                                <p className="about-text">
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here making.
                                </p>
                                <Link to={'/'}>
                                    <button className="book-btn">BOOK TICKETS</button>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="about-image-container">
                                <img
                                    className="about-img"
                                    src="https://themes.themewild.com/ticket/assets/img/about/about.jpg"
                                    alt="About Us"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="why-choose-section">
                <div className="why-choose-bg">
                    <img
                        className="why-choose-img"
                        src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Vwd2s2MTY5MTk3NS13aWtpbWVkaWEtaW1hZ2Uta293YjI4OTguanBn.jpg"
                        alt="Background"
                    />
                </div>

                <div className="container">
                    <div className="why-choose-content">
                        <h4 className="section-subtitle">CHOOSE</h4>
                        <h2 className="section-title">WHY CHOOSE US</h2>
                        <p className="why-choose-text">
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                        </p>

                        <div className="features-list">
                            <div className="feature-item">
                                <TbUserScreen className="feature-icon" />
                                <span className="feature-text">USER FRIENDLY INTERFACE</span>
                            </div>
                            <div className="feature-item">
                                <FaRegHandshake className="feature-icon" />
                                <span className="feature-text">MAINTAIN YOUR TRUST</span>
                            </div>
                            <div className="feature-item">
                                <BiSupport className="feature-icon" />
                                <span className="feature-text">24/7 BEST SUPPORT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Achievements Stats */}
            <div className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div
                            className={`stat-card ${hoveredStat === 'customers' ? 'hovered' : ''}`}
                            onMouseEnter={() => handleMouseEnter('customers')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <FaUsers className="stat-icon" />
                            <div className="stat-number">20K+</div>
                            <div className="stat-label">Customers</div>
                        </div>

                        <div
                            className={`stat-card ${hoveredStat === 'countries' ? 'hovered' : ''}`}
                            onMouseEnter={() => handleMouseEnter('countries')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <IoMdGlobe className="stat-icon" />
                            <div className="stat-number">200</div>
                            <div className="stat-label">Countries</div>
                        </div>

                        <div
                            className={`stat-card ${hoveredStat === 'areas' ? 'hovered' : ''}`}
                            onMouseEnter={() => handleMouseEnter('areas')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <BsBuildings className="stat-icon" />
                            <div className="stat-number">10K+</div>
                            <div className="stat-label">Area & City</div>
                        </div>

                        <div
                            className={`stat-card ${hoveredStat === 'tickets' ? 'hovered' : ''}`}
                            onMouseEnter={() => handleMouseEnter('tickets')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <IoWalletOutline className="stat-icon" />
                            <div className="stat-number">80M+</div>
                            <div className="stat-label">Ticket Sales</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="testimonials-section">
                <div className="container">
                    <div className="testimonials-header">
                        <h4 className="section-subtitle text-center">TESTIMONIALS</h4>
                        <h2 className="section-title text-center">WHAT PEOPLE SAY ABOUT US</h2>
                    </div>
                </div>

                <MDBCarousel showControls showIndicators interval={1500} className="testimonials-carousel">
                    <MDBCarouselItem itemId={1} interval={1500}>
                        <img
                            className="testimonial-bg"
                            src='https://img.freepik.com/free-photo/optical-fiber-background_23-2149301532.jpg'
                            alt='Background'
                        />
                        <MDBCarouselCaption>
                            <img
                                className="testimonial-avatar"
                                src="https://wallpapers-clan.com/wp-content/uploads/2024/02/one-piece-aestehtic-zoro-pfp-02.jpg"
                                alt="Roronoa Zoro"
                            />
                            <h5 className="testimonial-name">Roronoa Zoro</h5>
                            <p className="testimonial-text">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>

                    <MDBCarouselItem itemId={2}>
                        <img
                            className="testimonial-bg"
                            src='https://img.freepik.com/free-photo/optical-fiber-background_23-2149301532.jpg'
                            alt='Background'
                        />
                        <MDBCarouselCaption>
                            <img
                                className="testimonial-avatar"
                                src="https://avatarfiles.alphacoders.com/375/thumb-1920-375571.png"
                                alt="Wonder Woman"
                            />
                            <h5 className="testimonial-name">Wonder Woman</h5>
                            <p className="testimonial-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>

                    <MDBCarouselItem itemId={3}>
                        <img
                            className="testimonial-bg"
                            src='https://img.freepik.com/free-photo/optical-fiber-background_23-2149301532.jpg'
                            alt='Background'
                        />
                        <MDBCarouselCaption>
                            <img
                                className="testimonial-avatar"
                                src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg"
                                alt="John Wick"
                            />
                            <h5 className="testimonial-name">John Wick</h5>
                            <p className="testimonial-text">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                </MDBCarousel>
            </div>

            {/* Gallery */}
            <div className="gallery-section">
                <div className="container">
                    <div className="gallery-header">
                        <h4 className="section-subtitle text-center">GALLERY</h4>
                        <h2 className="section-title text-center">PHOTO GALLERY</h2>
                        <p className="gallery-description text-center">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        </p>
                    </div>
                </div>

                <div className="container">
                    <div className="image-gallery-grid">
                        <div className="grid-item item-1"></div>
                        <div className="grid-item item-2"></div>
                        <div className="grid-item item-3"></div>
                        <div className="grid-item item-4"></div>
                        <div className="grid-item grid-item-large item-5"></div>
                        <div className="grid-item item-6"></div>
                        <div className="grid-item item-7"></div>
                        <div className="grid-item item-8"></div>
                        <div className="grid-item item-9"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs