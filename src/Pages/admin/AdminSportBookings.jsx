import React, { useEffect, useState } from 'react'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { getAllSportBookingsAPI } from '../../Services/allAPI';

function AdminSportBookings() {

  const [sportBookings, setSportBookings] = useState([]);

  useEffect(() => {
    getAllSBookings();
  }, []);

  const getAllSBookings = async () => {
    try {
      const response = await getAllSportBookingsAPI()
      console.log(response);
      setSportBookings(response.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = sportBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const totalPages = Math.ceil(sportBookings.length / bookingsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div>
      <h2 className='text-center text-light'>Sport Bookings List</h2>

      <MDBDropdown>
        <MDBDropdownToggle tag='a' className='btn btn-primary'>
          Bookings
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link><a href="/admin/dashboard/bookings">Movie Bookings</a></MDBDropdownItem>
          <MDBDropdownItem link><a href="/admin/dashboard/eventBookings">Event Bookings</a></MDBDropdownItem>
          <MDBDropdownItem link><a href="/admin/dashboard/sportBookings">Sport Bookings</a></MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>

      <MDBTable className='text-light'>
        <MDBTableHead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>User</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Booking Date</th>
            <th scope='col'>Booking Time</th>
            <th scope='col'>Status</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentBookings.map((booking, index) => {
            const bookingDate = new Date(booking.bookingDate);

            const dateOnly = bookingDate.toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });

            const timeOnly = bookingDate.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            });

            return (
              <tr key={booking._id}>
                <th scope='row'>{indexOfFirstBooking + index + 1}</th>
                <td>{booking.sportName}</td>
                <td>{booking.user.name}</td>
                <td>&#8377; {booking.totalAmount}</td>
                <td>{dateOnly}</td>
                <td>{timeOnly}</td>
                <td>{booking.paymentStatus}</td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>


      <div className="d-flex justify-content-center mt-3">
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`btn btn-sm mx-1 ${currentPage === number ? 'btn-primary' : 'btn-outline-light'}`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AdminSportBookings