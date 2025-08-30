import React, { useState, useEffect } from 'react';
import './MyBookings.css'
import { getAllEventBookingsAPI, getAllMovieBookingsAPI, getAllSportBookingsAPI } from '../../Services/allAPI';

function MyBookings() {
    const storedEmail = sessionStorage.getItem("email");

    const [movieBookings, setMovieBookings] = useState([]);
    const [eventBookings, setEventBookings] = useState([]);
    const [sportBookings, setSportBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const [movieRes, eventRes, sportRes] = await Promise.all([
                    getAllMovieBookingsAPI(),
                    getAllEventBookingsAPI(),
                    getAllSportBookingsAPI()
                ]);

                const userMovies = movieRes.data.filter(b => b.user?.email === storedEmail);
                const userEvents = eventRes.data.filter(b => b.user?.email === storedEmail);
                const userSports = sportRes.data.filter(b => b.user?.email === storedEmail);

                setMovieBookings(userMovies);
                setEventBookings(userEvents);
                setSportBookings(userSports);
            } catch (err) {
                console.error("Failed to fetch bookings:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="container myBooking">
            <h2 className="text-center text-light mb-4">🎟️ My Bookings</h2>

            {loading ? (
                <p className="text-center text-primary">Loading bookings...</p>
            ) : (
                <>
                    {/* Movie Bookings */}
                    <h4 className="text-light">🎬 Movie Bookings</h4>
                    {movieBookings.length === 0 ? (
                        <p className="text-muted">No movie bookings found.</p>
                    ) : (
                        movieBookings.map((booking, index) => (
                            <div key={index} className="card mb-4 shadow-sm text-light" style={{ backgroundColor: 'rgb(16, 44, 112)' }}>
                                <div className="card-body">
                                    <h4>{booking.movieName}</h4>
                                    <p><strong>Date:</strong> {booking.date}</p>
                                    <p><strong>Time:</strong> {booking.time}</p>
                                    <p><strong>Seats:</strong> {booking.seats?.join(', ')}</p>
                                    <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
                                    <p><strong>Status:</strong>
                                        <span className={`ms-2 badge bg-${booking.paymentStatus === 'Success' ? 'success' : 'danger'}`}>
                                            {booking.paymentStatus}
                                        </span>
                                    </p>
                                    <p><strong>Booked On:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Event Bookings */}
                    <h4 className="text-light mt-5">🎉 Event Bookings</h4>
                    {eventBookings.length === 0 ? (
                        <p className="text-muted">No event bookings found.</p>
                    ) : (
                        eventBookings.map((booking, index) => (
                            <div key={index} className="card mb-4 shadow-sm text-light" style={{ backgroundColor: 'rgb(16, 44, 112)' }}>
                                <div className="card-body">
                                    <h4>{booking.eventName}</h4>
                                    <p><strong>Date:</strong> {booking.date}</p>
                                    <p><strong>Time:</strong> {booking.time}</p>
                                    <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
                                    <p><strong>Status:</strong>
                                        <span className={`ms-2 badge bg-${booking.paymentStatus === 'Success' ? 'success' : 'danger'}`}>
                                            {booking.paymentStatus}
                                        </span>
                                    </p>
                                    <p><strong>Booked On:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Sport Bookings */}
                    <h4 className="text-light mt-5">🏅 Sport Bookings</h4>
                    {sportBookings.length === 0 ? (
                        <p className="text-muted">No Sport bookings found.</p>
                    ) : (
                        sportBookings.map((booking, index) => (
                            <div key={index} className="card mb-4 shadow-sm text-light" style={{ backgroundColor: 'rgb(16, 44, 112)' }}>
                                <div className="card-body">
                                    <h4>{booking.sportName}</h4>
                                    <p><strong>Date:</strong> {booking.date}</p>
                                    <p><strong>Time:</strong> {booking.time}</p>
                                    <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
                                    <p><strong>Status:</strong>
                                        <span className={`ms-2 badge bg-${booking.paymentStatus === 'Success' ? 'success' : 'danger'}`}>
                                            {booking.paymentStatus}
                                        </span>
                                    </p>
                                    <p><strong>Booked On:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
                                </div>
                            </div>
                        ))
                    )}
                </>
            )}
        </div>
    );
}

export default MyBookings;
