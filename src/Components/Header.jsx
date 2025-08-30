import React, { useState, useEffect, useContext } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarLink,
    MDBIcon,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem
} from 'mdb-react-ui-kit';
import { IoTicketOutline } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { headerContextResponse } from '../ContextAPI/ContextShare';
import { FaBars } from "react-icons/fa";
import './Header.css';

function Header() {
    const { isLoggedIn, username, logout } = useContext(headerContextResponse);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const [openNavSecond, setOpenNavSecond] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const userBookings = () => {
        const storedEmail = sessionStorage.getItem("email");
        if (storedEmail) {
            navigate(`/myBookings`);
            window.scrollTo(0, 0);
        } else {
            console.error("Email not found in sessionStorage");
        }
    };

    return (
        <MDBNavbar
            expand="lg"
            style={{
                backgroundColor: scrolled ? '#0a1a3a' : 'transparent',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
                transition: 'background-color 0.3s ease'
            }}
        >
            <MDBContainer fluid>
                <MDBNavbarBrand id='BrandName' href="/" className="text-white fw-bold fs-3 d-flex align-items-center">
                    <IoTicketOutline className='me-2' />
                    Tickets
                </MDBNavbarBrand>

                <MDBNavbarToggler
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setOpenNavSecond(!openNavSecond)}
                >
                    <FaBars className="text-white fs-4" />
                </MDBNavbarToggler>

                <MDBCollapse navbar open={openNavSecond}>
                    <MDBNavbarNav className="Header-Space d-flex flex-column flex-lg-row align-items-center align-items-lg-center justify-content-center justify-content-lg-start w-100">
                        <MDBNavbarLink href="/" className="nav-link-custom">Home</MDBNavbarLink>
                        <MDBNavbarLink href="/movies" className="nav-link-custom">Movies</MDBNavbarLink>
                        <MDBNavbarLink href="/events" className="nav-link-custom">Events</MDBNavbarLink>
                        <MDBNavbarLink href="/sports" className="nav-link-custom">Sports</MDBNavbarLink>
                        <MDBNavbarLink href="/aboutus" className="nav-link-custom">About</MDBNavbarLink>
                        <MDBNavbarLink href="/contact" className="nav-link-custom">Contact</MDBNavbarLink>

                        {isLoggedIn ? (
                            <MDBDropdown className="ms-lg-auto mt-3 mt-lg-0">
                                <MDBDropdownToggle tag='a' className='btn btn-light w-100 w-lg-auto'>
                                    Hi, {username}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem onClick={userBookings} className='bg-warning text-light' link>
                                        <MdOutlineShoppingCart className='fs-5' /> My Bookings
                                    </MDBDropdownItem>
                                    <MDBDropdownItem className='bg-danger text-light' onClick={handleLogout} link>
                                        <IoMdExit className='fs-5' /> Logout
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        ) : (
                            <div className="d-flex flex-column flex-lg-row ms-lg-auto mt-3 mt-lg-0 gap-2">
                                <Link to="/login">
                                    <button className='Auth-btn'>Login</button>
                                </Link>
                                <Link to="/register">
                                    <button className='Auth-btn'>Sign Up</button>
                                </Link>
                            </div>
                        )}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Header;
