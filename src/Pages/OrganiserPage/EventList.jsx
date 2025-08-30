import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { deleteEventAPI, getAllEventsAPI } from '../../Services/allAPI';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function EventList() {

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

  const navigate = useNavigate()

  const editEvent = (id) => {
    navigate(`/organiser/dashboard/events/edit/${id}`);
    scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Event")) {
      try {
        await deleteEventAPI(id);
        toast.success("Event deleted successfully")
        getAllEvents()
      }
      catch (err) {
        toast.error("Failed to delete Event")
      }
    }
  }

  return (
    <div>
      <h2 className='text-center text-light'>Events List</h2>

      <a href="/organiser/dashboard/events/add"><button className='mt-3 btn btn-outline-light'>Add Event</button></a>

      <MDBTable className='text-light'>
        <MDBTableHead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Venue</th>
            <th scope='col'>Language</th>
            <th scope='col'>Duration</th>
            <th scope='col'>Date</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
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
              <td><FaEdit style={{ cursor: 'pointer' }} onClick={() => editEvent(event._id)} className='text-warning fs-4' /></td>
              <td><AiFillDelete onClick={()=>handleDelete(event._id)} style={{ cursor: 'pointer' }} className='text-danger fs-4' /></td>
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

export default EventList