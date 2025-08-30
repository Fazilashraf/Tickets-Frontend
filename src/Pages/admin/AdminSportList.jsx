import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { getAllSportsAPI } from '../../Services/allAPI';
import { ToastContainer } from 'react-toastify';

function AdminSportList() {

  const [allSports, setAllSports] = useState([])

  useEffect(() => {
    getAllSports();
  }, []);

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

  const [currentPage, setCurrentPage] = useState(1);
  const sportsPerPage = 4;

  const sortedSports = [...allSports].sort((a, b) => new Date(b.date) - new Date(a.date));

  const indexOfLastSport = currentPage * sportsPerPage;
  const indexOfFirstSport = indexOfLastSport - sportsPerPage;
  const currentSports = sortedSports.slice(indexOfFirstSport, indexOfLastSport);

  const totalPages = Math.ceil(allSports.length / sportsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div>
      <h2 className='text-center text-light'>Sports List</h2>

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
          {currentSports.map((sport, index) => (
            <tr key={sport._id}>
              <th scope='row'>{indexOfFirstSport + index + 1}</th>
              <td>
                <img className='me-1' width={40} src={sport.sptImg} alt="" />
                {sport.name}
              </td>
              <td>{sport.venue}</td>
              <td>{sport.language}</td>
              <td>{sport.duration}</td>
              <td>{sport.date}</td>
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

export default AdminSportList