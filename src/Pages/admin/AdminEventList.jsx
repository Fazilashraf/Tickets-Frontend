import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { getAllEventsAPI } from '../../Services/allAPI';
import { ToastContainer } from 'react-toastify';

function AdminEventList() {

  const [allEvents, setAllEvents] = useState([])

  useEffect(() => {
    getAllEvents();
  }, []);

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

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  const sortedEvents = [...allEvents].sort((a, b) => new Date(b.date) - new Date(a.date));

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(allEvents.length / eventsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div>
      <h2 className='text-center text-light'>Events List</h2>

      <MDBTable className='text-light mt-4'>
        <MDBTableHead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Venue</th>
            <th scope='col'>Language</th>
            <th scope='col'>Duration</th>
            <th scope='col'>Date</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentEvents.map((event, index) => (
            <tr key={event._id}>
              <th scope='row'>{indexOfFirstEvent + index + 1}</th>
              <td>
                <img className='me-1' width={40} src={event.evtImg} alt="" />
                {event.name}
              </td>
              <td>{event.venue}</td>
              <td>{event.language}</td>
              <td>{event.duration}</td>
              <td>{event.date}</td>
            </tr>
          ))}
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
      <ToastContainer />
    </div>
  )
}

export default AdminEventList